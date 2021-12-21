import { JsonController, Param, Body, Get, Post, Req } from 'routing-controllers';
import Book from '../models/book';
import { Types } from "mongoose"
import Joi from 'joi';

const paypal = require('@paypal/checkout-server-sdk');
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;


@JsonController('/api')
export class PayController {


  @Post('/payment')
  async postPayment(@Body() body: any, user: any, @Req() req: any) {
    // // Creating an environment


    // This sample uses SandboxEnvironment. In production, use LiveEnvironment
    let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    let client = new paypal.core.PayPalHttpClient(environment);

    // console.log("API called");

    // // Construct a request object and set desired parameters
    // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      "intent": "CAPTURE",
      "purchase_units": [
        {
          "amount": {
            "currency_code": "INR",
            "value": "5000.00"
          }
        }
      ]
    });

    // Call API with your client and get a response for your call
    // let createOrder  = async function() {

      let response = await client.execute(request);
      console.log(`Response: ${JSON.stringify(response)}`);

      console.log("Resonse Sent");
      
    //   // If call returns body in response, you can get the deserialized version from the result attribute of the response.
      console.log(`Order: ${JSON.stringify(response.result)}`);

      return {
        orderDetails : response
      }

    //   return {
    //     test: JSON.stringify(response)
    //   } ;
    // }
    // createOrder();
  
  
  }


}

