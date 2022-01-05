import {
    Post, Controller, Res,Body
  } from 'routing-controllers';
  import { OpenAPI } from 'routing-controllers-openapi';
 const client = require("@mailchimp/mailchimp_marketing");

 const md5 = require("md5")

  
  @Controller('/subscribe')
  export default class SubscribeController {
   
  
    @Post('/')
    @OpenAPI({
      description: 'signup for subscribers',
    })
    async signup(@Body() body: any, @Res() response: any) {  client.setConfig({
      apiKey: "403a8f597225fe3bd5394f02dd2c4ea6-us20",
      server: "us20",
    });
    const { email } = body
    const tags: any = ["subscribe", "ok"];

    const subscriberHash = md5(email.toLowerCase());
    const listId = '5001e653d7';

    const result = await client.lists.setListMember(
      listId,
      subscriberHash,
      {
        email_address: email,
        status_if_new: 'subscribed',
      }
    );

    const existingTags = result.tags.map((tag: any) => tag.name);
    const allUniqueTags = [...new Set([...existingTags, ...tags])];
    const formattedTags = allUniqueTags.map((tag) => {
        return {
          name: tag,
          status: 'active',
        };
    });
    const updateSubscriberTags = await client.lists.updateListMemberTags(
        listId,
        subscriberHash,
        {
          body: {
            tags: formattedTags,
          },
        }
      );
    return response.message = "Thanks for subscribing!"
  
  } }