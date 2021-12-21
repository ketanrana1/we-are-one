import {
  Post,
  JsonController,
  Body, UseBefore,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import Joi from 'joi';
import { getTemplate, sendEmail } from 'services/mailer';
import Influencer from 'app/entity/Influencer';
import RecaptchaMiddleware from 'middlewares/RecaptchaMiddleware';

@JsonController('/influencer')
export default class InfluencerController {

  @Post('/')
  @UseBefore(RecaptchaMiddleware)
  @OpenAPI({
    description: 'Influencers',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            example: {
              name: 'XXXXXXXX',
              emailAddress: 'username@domain.com',
              phoneNumber: '999999999',
              message: 'ABC',
              facebookLink: 'XXX',
              instagramLink: 'XXX',
              pinterestLink: 'XXX',
              tiktokLink: 'XXX',
              twitterLink: 'XXX',
              recaptcha: 'Recaptcha Token',
            },
          },
        },
      },
    },
  })
  async Influencer(@Body() body: any) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        emailAddress: Joi.string().email({ tlds: { allow: false } }).message('Invalid Email Address').required()
          .label('Email'),
        phoneNumber: Joi.number().required(),
        message: Joi.string(),
        facebookLink: Joi.string(),
        instagramLink: Joi.string(),
        pinterestLink: Joi.string(),
        tiktokLink: Joi.string(),
        twitterLink: Joi.string(),
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

      const influencer = new Influencer();
      influencer.name = body.name;
      influencer.emailAddress = body.emailAddress;
      influencer.phoneNumber = body.phoneNumber;
      influencer.message = body.message;
      influencer.facebookLink = body.facebookLink;
      influencer.instagramLink = body.instagramLink;
      influencer.pinterestLink = body.pinterestLink;
      influencer.tiktokLink = body.tiktokLink;
      influencer.twitterLink = body.twitterLink;
      await influencer.save();

      const adminEmailContent = await getTemplate('emails/influencer.ejs', { name: 'Admin', body });
      await sendEmail({
        to: 'admin@candycoin.com',
        subject: 'New Influencer Request',
        html: adminEmailContent,
      });

      return {
        success: true,
        message: 'Your message has been received. We will respond in less than 24 hours!',
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
