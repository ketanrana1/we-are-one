import {
  Get, JsonController, Req, Res,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import paypal from 'services/paypal';
import Order from 'models/order';
import Transaction from 'models/transaction';

// import Transaction, { TransactionStatus } from 'app/entity/Transaction';
// import shippingEasy from 'app/services/ShippingEasy';
// import { getTemplate, sendEmail } from 'services/mailer';
// import commonService from 'app/services/Common';
// import logger from 'app/services/Logger';
// import { sendToSales, sendToCsrDeclines } from 'app/services/Slack';

@JsonController('/payment')
export default class PaymentController {

  @Get('/paypal/success')
  @OpenAPI({
    description: 'PayPal Success Callback',
  })
  async paymentSuccess(@Req() request: any, @Res() response: any) {
    const { orderId, token, transactionId } = request.query;
    const order = await Order.findOne({ orderId });
   const transaction = await Transaction.findOne({ transactionId });
  
      const url = process.env.REACT_APP_URL;
      if (order instanceof Order) {
         
          const payment: any = await paypal.captureOrder(token);
         
          if (payment.statusCode === 201) {
            order.status = "Completed";
            transaction.status = "Received";
            transaction.info = payment
            await order.save();
            await transaction.save();
            response.redirect(`http://localhost:3000/success`);
            return response;
          }
       
      }
  } 

  @Get('/paypal/cancel')
  @OpenAPI({
    description: 'PayPal Cancel Callback',
  })
  async paymentCancel(@Req() request: any, @Res() response: any) {
    const { orderId, transactionId } = request.query;
    const order = await Order.findOne({ orderId });
    // const transaction = await Transaction.findOne({ transactionId });
    
      const url = process.env.REACT_APP_URL;
      // if (order instanceof Order) {
      //   if (transaction instanceof Transaction) {
      //     transaction.status = TransactionStatus.Cancelled;
      //     await transaction.save();

      //     order.status = OrderStatus.Cancelled;
      //     await order.save();
      //     response.redirect(`${url}/checkout`);
      //     return response;
      //   }
      // }
      return {
        success: false,
        message: 'Invalid Request',
      };
    // } catch (_err: any) {
    //   logger.warn(`[Payment Cancel Callback Failed] ${_err.message}`);
    //   return {
    //     success: false,
    //     message: 'Invalid Request',
    //     error: _err.message,
    //   };
    
  }

}
