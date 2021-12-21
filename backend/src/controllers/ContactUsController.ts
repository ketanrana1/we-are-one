import {
  Post,
  JsonController,
  Body, UseBefore,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import Joi from 'joi';
import { getTemplate, sendEmail } from 'services/mailer';
import RecaptchaMiddleware from 'middlewares/RecaptchaMiddleware';

@JsonController('/contact-us')
export default class ContactUsController {

  @Post('/')
  @UseBefore(RecaptchaMiddleware)
  @OpenAPI({
    description: 'Contact Us',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            example: {
              name: 'XXXXXXXX',
              email: 'username@domain.com',
              phone: '999999999',
              message: 'ABC',
              recaptcha: 'Recaptcha Token',
            },
          },
        },
      },
    },
  })
  async contactUs(@Body() body: any) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).message('Invalid Email Address').required()
          .label('Email'),
        phone: Joi.number().required(),
        message: Joi.string(),
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

      const emailContent = await getTemplate('emails/contact-us.ejs', { name: body.name });
      await sendEmail({
        to: body.email,
        subject: 'Thank you for contacting us',
        html: emailContent,
      });

      const adminEmailContent = await getTemplate('emails/admin-contact-us.ejs', { name: 'Admin', body });
      await sendEmail({
        to: 'sales@candycoin.com',
        subject: 'Someone contacted on the CandyCoin.com',
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
