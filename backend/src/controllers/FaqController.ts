import {
  Get,
  JsonController,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import Faq from 'app/entity/Faq';

@JsonController('/faqs')
export default class FaqController {

  @Get('/')
  @OpenAPI({
    description: 'Get the list of all faqs',
  })
  async getAllFaqs() {
    try {
      const faqs = await Faq.find({
        where: {
          enabled: true,
        },
      });

      return {
        success: true,
        data: faqs,
      };
    } catch (_err) {
      return {
        success: false,
        message: 'Invalid Request',
      };
    }
  }

}
