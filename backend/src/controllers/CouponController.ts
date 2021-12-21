import {
  Post,
  Body,
  JsonController,
} from 'routing-controllers';
import Joi from 'joi';
import { OpenAPI } from 'routing-controllers-openapi';
import Coupon from 'app/entity/Coupon';
import couponService from 'app/services/Coupon';

@JsonController('/coupon')
export default class DefaultController {

  @Post('/validate')
  @OpenAPI({
    description: 'Validate the coupon code',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            example: {
              code: 'XXXXXXXX',
              amount: 0.00,
            },
          },
        },
      },
    },
  })
  async validate(@Body() body: any) {
    try {
      const schema = Joi.object({
        code: Joi.string().required().label('Code'),
        amount: Joi.number().required().label('Amount'),
      });
      const validate = schema.validate(body);
      if (validate.error) {
        return {
          success: false,
          message: 'Request data is invalid',
          error: validate.error.details.map((d) => d.message),
        };
      }

      const couponCode = await Coupon.findOne({
        code: body.code.toUpperCase(),
      });
      if (!couponCode) {
        return {
          success: false,
          message: 'Invalid coupon code',
        };
      }
      let couponDiscount = 0.00;
      if (couponCode) {
        couponDiscount = await couponService.getDiscountAmount(couponCode, body.amount);
      }
      return {
        success: true,
        data: { couponCode: couponCode.code, couponDiscount },
        message: 'Congratulations! Coupon code applied successfully',
        code: body.code,
      };
    } catch (_err) {
      return {
        success: false,
        message: 'Invalid Request',
      };
    }
  }

}
