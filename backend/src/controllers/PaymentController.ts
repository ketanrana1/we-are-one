import {
  Get, JsonController, Req, Res,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import paypal from 'services/paypal';
import Order from 'models/order';
import Transaction from 'models/transaction';
import { getTemplate, sendEmail } from 'services/mailer';

import users from 'models/users';


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
            const emailContent = await getTemplate('emails/order-received.ejs', { order, transaction});
            
            sendEmail({
              to: "testmail8196@gmail.com",
              cc: 'testmail8196@gmail.com',
              subject: `Order ${order.orderId} Receipt from worldofweareone.com`,
              html: emailContent,
            });

            const orderContent = await getTemplate('emails/order-details.ejs', { order, transaction});
            sendEmail({
              to: `${order.shipping_email}`,
              cc: 'testmail8196@gmail.com',
              subject: `Order ${order.orderId} Receipt from worldofweareone.com`,
              html: orderContent,
            });
            response.redirect(`${process.env.FRONTEND_BASE_URL}success`);
            return response;

          }       
      }
  } 


  @Get('/paypal/success/mobile')
  @OpenAPI({ description: 'PayPal Mobile Success Callback', })
  async paymentSuccessMobile(@Req() request: any, @Res() response: any) {

    const { userId, token, transactionId } = request.query; 
    const payment: any = await paypal.captureOrder(token);

    if (payment.statusCode === 201) {
      await users.findOneAndUpdate({ "userId": userId }, { 
        is_paid: "true"     
        });
      response.redirect(`${process.env.FRONTEND_BASE_URL}successMobile`);           
      return response;
    }

  }


  @Get('/paypal/cancel/mobile')
  @OpenAPI({
    description: 'PayPal Mobile Cancel Callback',
  })
  async mobilePaymentCancel(@Req() request: any, @Res() response: any) {
    const { orderId, userId} = request.query;

    await users.findOneAndUpdate({ "userId": userId }, { 
      is_paid: "false"
    });
    
      response.redirect(`${process.env.FRONTEND_BASE_URL}paymentFailed`);

      return {
        success: false,
        message: 'Invalid Request',
      };

  }



  @Get('/paypal/cancel')
  @OpenAPI({
    description: 'PayPal Cancel Callback',
  })
  async paymentCancel(@Req() request: any, @Res() response: any) {
    const { orderId, transactionId } = request.query;
    const order = await Order.findOneAndUpdate({ "orderId": orderId }, {
      status: "Failed"
    }); 
    const transaction = await Transaction.findOneAndUpdate({ "transactionId": transactionId}, {
      status: "Failed"
    }); 


      response.redirect(`${process.env.FRONTEND_BASE_URL}paymentFailed`);

      return {
        success: false,
        message: 'Invalid Request',
      };
  
  }

}
