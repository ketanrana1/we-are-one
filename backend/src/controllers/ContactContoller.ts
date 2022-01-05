import Contact from '../models/contact';
import { Controller, Body, Get, Post, UploadedFile} from 'routing-controllers';
import Joi from 'joi';
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

      const contactContent = await getTemplate('emails/admin-contact-us.ejs', {body});
      sendEmail({
        to: "testmail8196@gmail.com",
        cc: 'testmail8196@gmail.com',
        subject: `Enquiry from ${body.email}`,
        html: contactContent,
      });

      const content = await getTemplate('emails/contact-us.ejs', {body});
      sendEmail({
        to: `${body.email}`,
        cc: 'testmail8196@gmail.com',
        subject: `Thank you for showing interest in We-are-one`,
        html: content,
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
         message: 'This action returns all the contact entries.'
     };
   }

}

