import {
  Post,
  JsonController,
  UseBefore,
  Body,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import Joi from 'joi';
import RecaptchaMiddleware from 'middlewares/RecaptchaMiddleware';
import Subscribers from 'app/entity/Subscribers';

@JsonController()
export default class DefaultController {

  @Post('/subscribe')
  @UseBefore(RecaptchaMiddleware)
  @OpenAPI({
    description: 'Subscribe to Newsletter',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            example: {
              email: 'username@domain.com',
              phone: '999999999',
              recaptcha: 'Recaptcha Token',
            },
          },
        },
      },
    },
  })
  async subscribe(@Body() body: any) {
    const schema = Joi.object({
      email: Joi.string().email().required().label('Email'),
      phone: Joi.string().label('Phone Number').messages({
        'string.base': 'Invalid Phone Number',
      }),
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

    return {
      success: true,
      message: 'Thank you for subscribing!',
    };
  }

}
