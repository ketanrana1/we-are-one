import Contact from '../models/contact';
import { JsonController, Put, Controller, UseBefore, UseAfter, Body, Get, Post,  Req, Res, BodyParam, UploadedFile, Delete, Param, QueryParam} from 'routing-controllers';
import Joi from 'joi';
import multer from 'multer';
var path = require('path');
const {v4 : uuidv4} = require('uuid') 
import { getTemplate, sendEmail } from 'services/mailer';




@Controller('/api')
export class ContactController {

  @Post('/contact')
  async postContact( @Body() body: any, 
    @UploadedFile("", { }) file : any ) {

    const contactSchema = Joi.object({
     
      first_name: Joi.string().required().label('First Name'),
      last_name: Joi.string().required().label('Last Name'),
      email: Joi.string().required().label('Email'),
      enquiry: Joi.string().required().label('Enquiry')

    });
  
    const validate = contactSchema.validate(body);

    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),  
      };
    }
  
    const newContact = new Contact(body);
    const result = await newContact.save();
    
    if(result) {

      sendEmail({
        to: "testmail8196@gmail.com",
        subject: 'some Subject',
        html: 'some content',
      });


      return {
        success: true,
        message: "Your message has been sent successfully!"
      };
    }

  }


  @Get('/allContacts')
  async getAllContacts() {
     const response = await Contact.aggregate([
      {
        '$project': { 
          _id: 0,
          first_name:1,
          last_name:1,
          email:1,
          enquiry:1,
        }
      }
    ]);
     return {
         response, 
        //  book,
         message: 'This action returns all the contact entries.'
     };
   }



}

