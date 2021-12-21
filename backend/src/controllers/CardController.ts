import Card from '../models/card';

import { JsonController, Put, Controller, UseBefore, UseAfter, Body, Get, Post,  Req, Res, BodyParam, UploadedFile, Delete, Param, QueryParam} from 'routing-controllers';
import Joi from 'joi';
var bodyParser = require('body-parser')
import multer from 'multer';
var path = require('path');
const {v4 : uuidv4} = require('uuid')
  

const fileUploadOptions = ( ) => ({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,  "../../src/public/uploads/images"))
    },
    
    filename: function (req: any, file: any, cb: any) {
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  fileFilter: (req: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png" || 
       file.mimetype ===  "video/mp4" ){
     
    cb(null, true);
   } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
      }
    }
});



 
@Controller('/api')
export class CardController {

  @Post('/card/addCard') 
  @UseBefore(
    multer( fileUploadOptions() ).fields([
        { maxCount: 1, name: 'card_image_file' },
        { maxCount: 1, name: 'file_video' },
    ]),
 )
  async addCard(@Body() body: any, @Req() req: any, @Res() res: any ){

    const fileOne = req.files.card_image_file[0];
    const fileTwo = req.files.file_video[0];
    // console.log(fileOne);
    // console.log(fileTwo);

  
   const cardSchema = Joi.object({

    card_image_file: Joi.any().label('Image'),
    card_image: Joi.any(),
    file_video: Joi.any().label('Video'),
    video_file: Joi.any(),
    card_content: Joi.string().required().label('Content'),
    type: Joi.string().required().label('Type'),
    mode: Joi.string().required().label('Mode'),
    status: Joi.string().required().label('String'),
 
   });

   const validate = cardSchema.validate(body);
   if (validate.error) {
     return {
       success: false,
       message: 'Request data is invalid',
       error: validate.error.details.map((d) => d.message),
     };
   }

    let cardBody = body;

    cardBody.card_image = req.files.card_image_file[0].filename;
    cardBody.video_file = req.files.file_video[0].filename;

    // cardBody.card_image = file.filename;
    // cardBody.video_file = "http://192.168.10.196:4000/videos/video.mp4";


    
    const newCard = new Card(cardBody);
    const result = await newCard.save();
    
    if(result) {
      return {
        success: true,
        message: "Card is Added."
      };
    }


  }


  @Post('/card/addFreeCard')
  async postFreeCards(@Body() body: any, user: any) {
    
    const newCard = new Card(body);
    const response = await newCard.save();
    
    if(response)
    return {message: "Saved"};
  } 

   @Post('/card/addPaidCard')
   async postPaidCards(@Body() body: any, user: any) {

    const cardSchema = Joi.object({

      card_image: Joi.string().required().label('Image'),
      card_content: Joi.string().required().label('Content'),
      type: Joi.string().required().label('Type'),
      mode: Joi.string().required().label('Mode'),
      status: Joi.string().required().label('String'),
      video_file: Joi.any()
    });

    const validate = cardSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }

    let newBody = body;
    newBody.video_file = "http://192.168.10.196:4000/videos/video.mp4";
     
     const newCard = new Card(newBody);
     const response = await newCard.save();
     
     if(response)
     return {message: "Saved"};
   }



   @Get('/card/getPaidCards')
  async getAllPaidCards() {
     const response = await Card.aggregate([
      {
        '$match': {
          'type': 'Paid'
        }
      }, {
        '$project': {
          _id:0,
          card_image: {
            $concat: [process.env.IMAGES_BASE_PATH, "$card_image"]
          },
          video_file: {
            $concat: [process.env.IMAGES_BASE_PATH, "$video_file"]
          },
          card_content: 1,
          type: 1,
          mode: 1,
          status: 1,
          id: 1,
          date_added: 1,
          date_modified: 1
        }
      }
    ]);
     return {
         response,
         message: 'This action returns all paid cards'
     };
   }


   @Get('/card/getFreeCards')
  async getAllFreeCards() {
     const response = await Card.aggregate([
      {
        '$match': {
          'type': 'Free'
        }
      }, {
        '$project': {
          _id:0,
          card_image: {
            $concat: [process.env.IMAGES_BASE_PATH, "$card_image"]
          },
          video_file: {
            $concat: [process.env.IMAGES_BASE_PATH, "$video_file"]
          },
          card_content: 1,
          type: 1,
          mode: 1,
          status: 1,
          id: 1,
          date_added: 1,
          date_modified: 1
        }
      }
    ]);
     return {
         response,
         message: 'This action returns all free cards'
     };
   }
 

   @Get('/card/allCards')
   async getAllCards() {
 
      const Cards = await Card.aggregate([
       {
         '$project': {
           _id: 0
         }
       }
     ]);
      return {
          Cards,
          message: 'This action returns all the cards'
      };
    }
 

    @Post('/card/delete/:id')
    public async deleteCard(@Param('id') id: string) {
 
 
     const bookDeleted = await Card.deleteOne({ id : id });
 
     if(bookDeleted) {
       return {
         success: true,
         message: 'Card is deleted',
       }
     } else {
       return {
         success: false,
         message: 'Could not delete the Card',
       }
     }
 
 
    }
 

}

