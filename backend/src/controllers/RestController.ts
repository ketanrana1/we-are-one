import {
  Get,
  JsonController,
  Render,
} from 'routing-controllers';
import dayjs from 'dayjs';
import Order from 'app/entity/Order';
import Transaction from 'app/entity/Transaction';

@JsonController('/test')
export default class TestController {

  @Get('/email')
  @Render('emails/save-10-email.ejs')
  async rest() {
    const order = await Order.findOne({ where: { id: 16 }, relations: ['billingAddress', 'shippingAddress', 'items', 'items.product'] });
    const transaction = await Transaction.findOne({ id: 2 });
    return {
      order,
      transaction,
      dayjs,
      reactAppUrl: process.env.REACT_APP_URL,
    };
  }

}
