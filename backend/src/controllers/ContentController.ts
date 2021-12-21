import { JsonController, UploadedFile, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import Content from '../models/content';
import { Types } from "mongoose"
import Joi from 'joi';

@JsonController('/api') 

export class ContentController {


  @Post('/addContent')

  async postContent( @Body() body: any, @UploadedFile("", { }) file: any ) {

    const contentSchema = Joi.object({

      about_us: Joi.string().required().label('About us'),
      contact_us: Joi.string().required().label('Contact us'),
      privacy_policy: Joi.string().required().label('Privacy Policy')
  
    });
  
    const validate = contentSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }

    const _id = "619359de022ce5e4dd5974a8";


    const response = await Content.findByIdAndUpdate(_id, { 
      about_us: body.about_us,
      contact_us: body.contact_us,
      privacy_policy: body.privacy_policy
     });

     if(response){
      return {message: "Content Added"};
     }
    
    // const newContent = new Content(body);
    // const response = await newContent.save();
    
    // if(response)
    // return {message: "Saved"};
  }

  @Get('/content')

  async getContent(@Body() body: any) {


    const response = await Content.aggregate([
        {
          '$project': {
            _id: 0,
          }
        }
      ]);

    return {
      response,
      message: 'This action returns site content details'
    };

  }

}

