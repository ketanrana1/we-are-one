import { JsonController, UploadedFile, Param, Body, Req, Get, Post, Put, Delete, Res } from 'routing-controllers';
import Content from '../models/content';
import Joi from 'joi'
import Order from '../models/order';

// @ts-ignore
const paypal = require('@paypal/checkout-server-sdk');






@JsonController('/api') 
export class CheckoutController {  
@Post('/checkout')
  async doCheckout(@Body() body: any, @Req() request: any, @Res() response: any,  @UploadedFile("", { }) file: any) {

    
  
// Creating an environment
let clientId = "AWq1h7RzdUcpnx1HIRcNboE9npA0Yx6yfqQ_ubxIgVbVrsQhYfRFpQmj_OMHFMpJ_TpdSVNBZWRdswP5";
let clientSecret = "EI-GnsaNrN-0O91jEaSQedgoWYVwa1d9h83YsuvXnKZah00OYShO7BaS26XyUDfLhwyEWup2vJ0IZVCc";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

// Construct a request object and set desired parameters
// Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
let requestt = new paypal.orders.OrdersCreateRequest();
requestt.requestBody({
    "intent": "CAPTURE",
    "purchase_units": [
        {
            "amount": {
                "currency_code": "USD",
                "value": "100.00"
            }
        }
     ]
});

// Call API with your client and get a response for your call
let createOrder  = async function() {
    let response = await client.execute(requestt);
    console.log(`Response: ${JSON.stringify(response)}`);
    
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Order: ${JSON.stringify(response.result)}`);
    
}
createOrder();

let captureOrder =  async function(response.result.id: any) {
  request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  // Call API with your client and get a response for your call
  let response = await client.execute(request);
  console.log(`Response: ${JSON.stringify(response)}`);
  // If call returns body in response, you can get the deserialized version from the result attribute of the response.
  console.log(`Capture: ${JSON.stringify(response.result)}`);
}

let capture = captureOrder('REPLACE-WITH-APPROVED-ORDER-ID'); 




  //   const returnUrl = "http://localhost:3000/checkout" 
  //   const cancelUrl = "http://localhost:3000/checkout"

  //  const respo = await Paypal.createPayment(returnUrl, cancelUrl)

  //  response.redirect(respo.result.links[1].href);
  //  console.log("RESPONSEEEEEEEEEEE", respo.result.links[1].href)


  //  return {
  //    url: respo.result.links[1].href
  //  };


    // const orderSchema = Joi.object({  
     
    //   shipping_firstname: Joi.string().required().label('First Name'),
    //   shipping_lastname: Joi.string().required().label('Last Name'),
    //   shipping_address_1: Joi.string().required().label('Shipping Adress 1'),
    //   shipping_address_2: Joi.string().label('Shipping Adress 2'),
    //   shipping_city: Joi.string().required().label('City'),
    //   shipping_state: Joi.string().required().label('State'),
    //   shipping_zip: Joi.string().required().label('Zip Code'),
    //   shipping_country: Joi.string().required().label('Country'),
    //   shipping_telephone: Joi.number().required().label('Phone Number'),
    //   shipping_email: Joi.string().required().label('Email'),
  
    //   billing_firstname: Joi.string().required().label('First Name'),
    //   billing_lastname: Joi.string().required().label('Last Name'),
    //   billing_address_1: Joi.string().required().label('Shipping Adress 1'),
    //   billing_address_2: Joi.string().label('Shipping Adress 2'),
    //   billing_city: Joi.string().required().label('City'),
    //   billing_state: Joi.string().required().label('State'),
    //   billing_zip: Joi.string().required().label('Zip Code'),
    //   billing_country: Joi.string().required().label('Country'),
    //   billing_telephone: Joi.number().required().label('Phone Number'),
    //   billing_email: Joi.string().required().label('Email')

    // });
  
    // const validate = orderSchema.validate(body);

    // if (validate.error) {
    //   return {
    //     success: false,
    //     message: 'Request data is invalid',
    //     error: validate.error.details.map((d) => d.message),  
    //   };
    // }

    // const newOrder = new Order(body);
    // const result = await newOrder.save();
    
    // if(result) {
    //   return {
    //     success: true,
    //     message: "Order is Created."
    //   };
    // }





  }

}

