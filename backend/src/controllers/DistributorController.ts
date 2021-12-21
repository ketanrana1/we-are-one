import {
  Post,
  JsonController,
  Body, UseBefore,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import Joi from 'joi';
import { getTemplate, sendEmail } from 'services/mailer';
import Distributor from 'app/entity/Distributor';
import RecaptchaMiddleware from 'middlewares/RecaptchaMiddleware';

@JsonController('/distributor')
export default class DistributorController {

  @Post('/')
  @UseBefore(RecaptchaMiddleware)
  @OpenAPI({
    description: 'Distributors',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            example: {
              companyName: 'XXXXXXXX',
              name: 'XXXXXXXX',
              emailAddress: 'username@domain.com',
              phoneNumber: '999999999',
              message: 'ABC',
              totalStores: '1',
              recaptcha: 'Recaptcha Token',
            },
          },
        },
      },
    },
  })
  async Distributor(@Body() body: any) {
    try {
      const schema = Joi.object({
        companyName: Joi.string(),
        name: Joi.string().required(),
        emailAddress: Joi.string().email({ tlds: { allow: false } }).message('Invalid Email Address').required()
          .label('Email'),
        phoneNumber: Joi.number().required(),
        message: Joi.string(),
        totalStores: Joi.number(),
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

      const distributor = new Distributor();
      distributor.companyName = body.companyName;
      distributor.name = body.name;
      distributor.emailAddress = body.emailAddress;
      distributor.phoneNumber = body.phoneNumber;
      distributor.message = body.message;
      distributor.totalStores = body.totalStores;
      await distributor.save();

      const adminEmailContent = await getTemplate('emails/distributor.ejs', { name: 'Admin', body });
      await sendEmail({
        to: 'admin@candycoin.com',
        subject: 'New Distributor Request',
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
