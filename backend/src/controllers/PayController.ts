import { JsonController, Body, Post, Req } from 'routing-controllers';
const paypal = require('@paypal/checkout-server-sdk');
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;


@JsonController('/api')
export class PayController {
  @Post('/payment')
  async postPayment(@Body() body: any, user: any, @Req() req: any) {
    let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    let client = new paypal.core.PayPalHttpClient(environment);
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

      let response = await client.execute(request);
      return {
        orderDetails : response
      }  
  }
} 

