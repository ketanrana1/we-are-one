import { JsonController, UploadedFile, Param, Body, Req, Get, Post, Put, Delete, Res } from 'routing-controllers';
import Content from '../models/content';
import Joi from 'joi'
import Order from '../models/order';
import PayPal from 'services/paypal';
import Transaction from 'models/transaction';






@JsonController('/api') 
export class CheckoutController {  
@Post('/checkout')
  async doCheckout(@Body() body: any, @Req() request: any, @Res() response: any,  @UploadedFile("", { }) file: any) {

 
  


    const orderSchema = Joi.object({  
     
      shipping_firstname: Joi.string().required().label('First Name'),
      shipping_lastname: Joi.string().required().label('Last Name'),
      shipping_address_1: Joi.string().required().label('Shipping Adress 1'),
      shipping_address_2: Joi.string().label('Shipping Adress 2'),
      shipping_city: Joi.string().required().label('City'),
      shipping_state: Joi.string().required().label('State'),
      shipping_zip: Joi.string().required().label('Zip Code'),
      shipping_country: Joi.string().required().label('Country'),
      shipping_telephone: Joi.number().required().label('Phone Number'),
      shipping_email: Joi.string().required().label('Email'),
  
      billing_firstname: Joi.string().required().label('First Name'),
      billing_lastname: Joi.string().required().label('Last Name'),
      billing_address_1: Joi.string().required().label('Shipping Adress 1'),
      billing_address_2: Joi.string().label('Shipping Adress 2'),
      billing_city: Joi.string().required().label('City'),
      billing_state: Joi.string().required().label('State'),
      billing_zip: Joi.string().required().label('Zip Code'),
      billing_country: Joi.string().required().label('Country'),
      billing_telephone: Joi.number().required().label('Phone Number'),
      billing_email: Joi.string().required().label('Email')

    });
  
    const validate = orderSchema.validate(body);

    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),  
      };
    }

    const newOrder = new Order(body);
    const transaction = new Transaction();
    newOrder.status = 'Created';
    transaction.status = "Redirecting to Gateway";
    await transaction.save();
    newOrder.transactionId =  transaction.transactionId;
    const result = await newOrder.save();
    newOrder.total_amount = "25";
    const url = `${request.protocol}://${request.get('host')}`;
    console.log(url)
    let approvalUrl = "";
    const returnUrl = `${url}/payment/paypal/success?orderId=${result.orderId}&transactionId=${transaction.transactionId}`;
    const cancelUrl = `${url}/payment/paypal/cancel?orderId=${result.orderId}&transactionId=${transaction.transactionId}`;
    const payment = await PayPal.createPayment( newOrder, returnUrl, cancelUrl);
    if (payment.statusCode === 201) {
      payment.result.links.forEach((link: any) => {
        if (link.rel === 'approve') {
          approvalUrl = link.href;
        }
      });
      return {
        // success: transaction.status === TransactionStatus.Completed
        //   || transaction.status === TransactionStatus.Redirect_To_Gateway || order.isCheckPO,
        message: 'We have received your order it will be shipped soon. Thank you for shopping with us.',
        data: {
          orderId: newOrder.orderId,
          // billingName: `${newOrder.billingAddress.name} ${newOrder.billingAddress.name}`,
          approvalUrl,
        },
      };
    }





  }

}
