
import {
    Post, Controller, Req, Res,Body
  } from 'routing-controllers';
  import { OpenAPI } from 'routing-controllers-openapi';
 const client = require("@mailchimp/mailchimp_marketing");
 client.setConfig({
  apiKey: "403a8f597225fe3bd5394f02dd2c4ea6-us20",
  server: "us20",
});
  
  @Controller('/subscribe')
  export default class SubscribeController {
   
  
    @Post('/')
    @OpenAPI({
      description: 'signup for subscribers',
    })
    async signup(@Body() body: any, @Res() response: any) {
      console.log(client)
      const responsee = await client.lists.addListMember("5001e653d7", {
        email_address: body.email,
        status: "subscriber",
      });
      console.log('dkjdlkj')
      console.log(responsee);
      return response
  
  } }