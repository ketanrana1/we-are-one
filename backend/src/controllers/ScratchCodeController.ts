import {
  Post,
  Body,
  JsonController,
  UseBefore,
} from 'routing-controllers';
import Joi from 'joi';
import { OpenAPI } from 'routing-controllers-openapi';
import WAValidator from 'multicoin-address-validator';
import ScratchCode from 'app/entity/ScratchCode';
import RedeemRequest from 'app/entity/RedeemRequest';
import RecaptchaMiddleware from 'middlewares/RecaptchaMiddleware';
import Subscribers from 'app/entity/Subscribers';
import logger from 'app/services/Logger';
import { getTemplate, sendEmail } from 'services/mailer';
import coinbase from 'app/services/Coinbase';

@JsonController('/scratch-code')
export default class DefaultController {

  @Post('/validate')
  @OpenAPI({
    description: 'Validate the scratch code',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            example: {
              code: 'XXXXXXXX',
            },
          },
        },
      },
    },
  })
  async validate(@Body() body: any) {
    try {
      const schema = Joi.object({
        code: Joi.string().min(8).max(8).required()
          .label('Code'),
      });
      const validate = schema.validate(body);
      if (validate.error) {
        return {
          success: false,
          message: 'Request data is invalid',
          error: validate.error.details.map((d) => d.message),
        };
      }

      const scratchCode = await ScratchCode.findOne({
        relations: ['rewardType'],
        where: {
          code: body.code.toUpperCase(),
          isRedeemed: false,
        },
      });
      if (!scratchCode) {
        return {
          success: false,
          message: 'This code is already Redeemed or Invalid.',
        };
      }

      return {
        success: true,
        message: `Congratulations! You won ${scratchCode.rewardType.name} worth $${scratchCode.rewardAmount}`,
        code: body.code,
        amount: scratchCode.rewardAmount,
        rewardType: scratchCode.rewardType.name,
      };
    } catch (_err) {
      return {
        success: false,
        message: 'Invalid Request',
      };
    }
  }

  @Post('/claim-reward')
  @UseBefore(RecaptchaMiddleware)
  @OpenAPI({
    description: 'Claim Reward',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            example: {
              code: 'XXXXXXXX',
              address: 'AddressWhereWeNeedToSendTheReward',
              email: 'username@domain.com',
              phone: '999999999',
              subscribe: true,
              recaptcha: 'Recaptcha Token',
            },
          },
        },
      },
    },
  })
  async claim(@Body() body: any) {
    try {
      const schema = Joi.object({
        code: Joi.string().min(8).max(8).required()
          .label('Code'),
        address: Joi.string().custom((value, helper) => {
          if (WAValidator.validate(value, 'BTC')) {
            return true;
          }
          if (WAValidator.validate(value, 'LTC')) {
            return true;
          }
          if (WAValidator.validate(value, 'ETH')) {
            return true;
          }
          // if (WAValidator.validate(value, 'XLM')) {
          //   return true;
          // }
          // @ts-ignore
          return helper.message('Invalid wallet Address');
        }).required().label('Address'),
        email: Joi.string().email({ tlds: { allow: false } }).message('Invalid Email Address').required()
          .label('Email'),
        phone: Joi.string().required().label('Phone Number').messages({
          'string.base': 'Invalid Phone Number',
        }),
        subscribe: Joi.boolean().required().label('Subscribe to Newsletter'),
        recaptcha: Joi.string().label('Recaptcha'),
      });
      const validate = schema.validate(body);
      if (validate.error) {
        return {
          success: false,
          message: 'Request data is invalid',
          error: validate.error.details.map((d) => d.message),
        };
      }

      const scratchCode = await ScratchCode.findOne({
        relations: ['rewardType'],
        where: {
          code: body.code.toUpperCase(),
          isRedeemed: false,
        },
      });
      if (!scratchCode) {
        return {
          success: false,
          message: 'This code is already Redeemed or Invalid.',
        };
      }

      scratchCode.isRedeemed = true;
      scratchCode.redeemedAt = new Date();

      const redeemRequest = new RedeemRequest();
      redeemRequest.code = scratchCode;
      redeemRequest.address = body.address;
      redeemRequest.email = body.email;
      redeemRequest.phone = body.phone;
      redeemRequest.rewardSent = false;
      redeemRequest.rewardSentAt = null;
      redeemRequest.createdAt = new Date();

      if (body.subscribe) {
        let subscriber = new Subscribers();

        const isEmailSubscribed = await Subscribers.findOne({ email: body.email });
        if (isEmailSubscribed) {
          subscriber = isEmailSubscribed;
        }

        const isPhoneSubscribed = await Subscribers.findOne({ phone: body.phone });
        if (!isEmailSubscribed && isPhoneSubscribed) {
          subscriber = isPhoneSubscribed;
        }

        subscriber.email = body.email;
        subscriber.phone = body.phone;
        subscriber.subscribedAt = new Date();
        subscriber.createdAt = new Date();
        subscriber.save();
      }

      await scratchCode.save();
      await redeemRequest.save();

      if (scratchCode.rewardAmount <= 0.26) {
        try {
          const cbRes: any = await coinbase.withdrawNative({
            to: redeemRequest.address,
            amount: scratchCode.rewardAmount,
            currency: scratchCode.rewardType.currency,
            description: `Control Number: ${scratchCode.controlNumber} | Code: ${scratchCode.code}`,
          });
          if (cbRes && cbRes.tx && cbRes.tx.id) {
            logger.warn(`[Crypto Sent Success] Tx Id: ${cbRes.tx.id} | Amount: ${cbRes.amount} | Rate: ${cbRes.price}`);
            redeemRequest.coinbaseTxId = cbRes.tx.id;
            redeemRequest.cryptoAmountSent = cbRes.amount;
            redeemRequest.cryptoRate = cbRes.price;
            redeemRequest.rewardSent = true;
            redeemRequest.rewardSentAt = new Date();
            await redeemRequest.save();
          }
          if (cbRes && cbRes.status === false) {
            logger.warn(`[Crypto Sent Failed] ${cbRes.message}`);
          }
        } catch (cbErr: any) {
          logger.warn(`[Crypto Sent Failed] ${scratchCode.controlNumber} | ${cbErr.message}`);
        }
      }

      const emailContent = await getTemplate('emails/claim-rewards.ejs', { redeemRequest, scratchCode });
      sendEmail({
        to: redeemRequest.email,
        subject: 'You Won Free Crypto from CandyCoin.com!',
        html: emailContent,
      });

      const adminRewardContent = await getTemplate('emails/reward.ejs', { redeemRequest, scratchCode });
      await sendEmail({
        to: 'sales@candycoin.com',
        subject: `Raffle Card ${redeemRequest.code.controlNumber}  Has Been Redeemed`,
        html: adminRewardContent,
      });

      return {
        success: true,
        message: `Congratulations! You won ${scratchCode.rewardType.name} worth $${scratchCode.rewardAmount}! We will send you your free crypto in 24 hours!`,
        code: body.code,
        amount: scratchCode.rewardAmount,
        rewardType: scratchCode.rewardType.name,
      };
    } catch (_err: any) {
      return {
        success: false,
        message: 'Invalid Request',
        error: _err.message,
      };
    }
  }

}
