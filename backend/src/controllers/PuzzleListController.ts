import PuzzleList from '../models/puzzleList';
import { Req, Res, Body, Get, Post, QueryParam, UploadedFile, Controller, UseBefore } from 'routing-controllers';
import Joi from 'joi';
import multer from 'multer';
var path = require('path');
const {v4 : uuidv4} = require('uuid');
import AdminAuthMiddleware from 'middlewares/AdminAuthMiddleware';


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
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
      }
    },
  limits: {
      fieldNameSize: 255,
      fileSize: 1024 * 1024 * 2
  }
});

@Controller('/api')
export class PuzzleListController {

  @Post('/addTypeFourPuzzle')
  @UseBefore(
    multer( fileUploadOptions() ).fields([
      { maxCount: 1, name: 'puzzle_image_file' },
      { maxCount: 1, name: 'pp_one_image' },
    ]),
  )


  async addTypeFourPuzzle( @Body() body: any, @Req() req:any, @Res() res:any) {

    const puzzleListSchema = Joi.object({
     
      puzzle_image_file: Joi.any().label('Puzzle Image'),
      puzzle_image: Joi.any(),
      puzzle_parts: Joi.any(),
      paid_status: Joi.string().required().label('Paid Status'),
      type: Joi.string().required().label('Type'),

    });
  
    const validate = puzzleListSchema.validate(body);

    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),  
      };
    }

    let puzzleBody = body; 

    //puzzleBody.puzzle_image = file.filename;
    const newPuzzle = new PuzzleList(puzzleBody);
    const result = await newPuzzle.save();
    
    if(result) {
      return {
        success: true,
        message: "Puzzle is Added."
      };
    }

  }

  @Post('/addPuzzle')
  @UseBefore(AdminAuthMiddleware)
  async postPuzzle( @Body() body: any, 
    @UploadedFile("puzzle_image_file", { options: fileUploadOptions() }) file : any ) {    

    const puzzleListSchema = Joi.object({
     
      puzzle_image_file: Joi.any().label('Puzzle Image'),
      puzzle_image: Joi.any(),
      puzzle_parts: Joi.any(),
      paid_status: Joi.string().required().label('Paid Status'),

    });
  
    const validate = puzzleListSchema.validate(body);

    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),  
      };
    }

    let puzzleBody = body; 

    puzzleBody.puzzle_parts = [


    
    [
      {
        type: 4
      },
      [
        {
          "image": "puzzleParts/wonderland/type-4/1.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "1"
      },
      {
          "image": "puzzleParts/wonderland/type-4/2.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "2"
      },
      {
          "image": "puzzleParts/wonderland/type-4/3.png",
          "mode": "portrait",
          "direction": "up",
          "sort_order": "3"
      },
      {
          "image": "puzzleParts/wonderland/type-4/4.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "4"
      }
  
      ]
    ],
    [
      {
        type: 9
      },
      [
        {
          "image": "puzzleParts/wonderland/type-9/1.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "1"
      },
      {
          "image": "puzzleParts/wonderland/type-9/2.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "2"
      },
      {
          "image": "puzzleParts/wonderland/type-9/3.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "3"
      },
      {
          "image": "puzzleParts/wonderland/type-9/4.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "4"
      },
      {
          "image": "puzzleParts/wonderland/type-9/5.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "5"
      },
      {
          "image": "puzzleParts/wonderland/type-9/6.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "6"
      },
      {
          "image": "puzzleParts/wonderland/type-9/7.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "7"
      },
      {
          "image": "puzzleParts/wonderland/type-9/8.png",
          "mode": "portrait",
          "direction": "up",
          "sort_order": "8"
      },
      {
          "image": "puzzleParts/wonderland/type-9/9.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "9"
      }
  
      ]
    ],
    [
      {
        type: 16
      },
      [
        {
          "image": "puzzleParts/wonderland/type-16/1.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "1"
      },
      {
          "image": "puzzleParts/wonderland/type-16/2.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "2"
      },
      {
          "image": "puzzleParts/wonderland/type-16/3.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "3"
      },
      {
          "image": "puzzleParts/wonderland/type-16/4.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "4"
      },
      {
          "image": "puzzleParts/wonderland/type-16/5.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "5"
      },
      {
          "image": "puzzleParts/wonderland/type-16/6.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "6"
      },
      {
          "image": "puzzleParts/wonderland/type-16/7.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "7"
      },
      {
          "image": "puzzleParts/wonderland/type-16/8.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "8"
      },
      {
          "image": "puzzleParts/wonderland/type-16/9.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "9"
      },
      {
          "image": "puzzleParts/wonderland/type-16/10.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "10"
      },
      {
          "image": "puzzleParts/wonderland/type-16/11.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "11"
      },
      {
          "image": "puzzleParts/wonderland/type-16/12.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "12"
      },
      {
          "image": "puzzleParts/wonderland/type-16/13.png",
          "mode": "portrait",
          "direction": "up",
          "sort_order": "13"
      },
      {
          "image": "puzzleParts/wonderland/type-16/14.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "14"
      },
      {
          "image": "puzzleParts/wonderland/type-16/15.png",
          "mode": "portrait",
          "direction": "up",
          "sort_order": "15"
      },
      {
          "image": "puzzleParts/wonderland/type-16/16.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "16"
      }
  
      ]
    ],
    [
      {
        type: 25
      },
      [
        {
          "image": "puzzleParts/wonderland/type-25/1.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "1"
      },
      {
          "image": "puzzleParts/wonderland/type-25/2.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "2"
      },
      {
          "image": "puzzleParts/wonderland/type-25/3.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "3"
      },
      {
          "image": "puzzleParts/wonderland/type-25/4.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "4"
      },
      {
          "image": "puzzleParts/wonderland/type-25/5.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "5"
      },
      {
          "image": "puzzleParts/wonderland/type-25/6.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "6"
      },
      {
          "image": "puzzleParts/wonderland/type-25/7.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "7"
      },
      {
          "image": "puzzleParts/wonderland/type-25/8.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "8"
      },
      {
          "image": "puzzleParts/wonderland/type-25/9.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "9"
      },
      {
          "image": "puzzleParts/wonderland/type-25/10.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "10"
      },
      {
          "image": "puzzleParts/wonderland/type-25/11.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "11"
      },
      {
          "image": "puzzleParts/wonderland/type-25/12.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "12"
      },
      {
          "image": "puzzleParts/wonderland/type-25/13.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "13"
      },
      {
          "image": "puzzleParts/wonderland/type-25/14.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "14"
      },
      {
          "image": "puzzleParts/wonderland/type-25/15.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "15"
      },
      {
          "image": "puzzleParts/wonderland/type-25/16.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "16"
      },
      {
          "image": "puzzleParts/wonderland/type-25/17.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "17"
      },
      {
          "image": "puzzleParts/wonderland/type-25/18.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "18"
      },
      {
          "image": "puzzleParts/wonderland/type-25/19.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "19"
      },
      {
          "image": "puzzleParts/wonderland/type-25/20.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "20"
      },
      {
          "image": "puzzleParts/wonderland/type-25/21.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "21"
      },
      {
          "image": "puzzleParts/wonderland/type-25/22.png",
          "mode": "portrait",
          "direction": "up",
          "sort_order": "22"
      },
      {
          "image": "puzzleParts/wonderland/type-25/23.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "23"
      },
      {
          "image": "puzzleParts/wonderland/type-25/24.png",
          "mode": "portrait",
          "direction": "up",
          "sort_order": "24"
      },
      {
          "image": "puzzleParts/wonderland/type-25/25.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "25"
      }
  
      ]
    ],
  
    [
      {
        type: 36
      },
      [
        {
          "image": "puzzleParts/wonderland/type-36/1.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "1"
      },
      {
          "image": "puzzleParts/wonderland/type-36/2.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "2"
      },
      {
          "image": "puzzleParts/wonderland/type-36/3.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "3"
      },
      {
          "image": "puzzleParts/wonderland/type-36/4.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "4"
      },
      {
          "image": "puzzleParts/wonderland/type-36/5.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "5"
      },
      {
          "image": "puzzleParts/wonderland/type-36/6.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "6"
      },
      {
          "image": "puzzleParts/wonderland/type-36/7.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "7"
      },
      {
          "image": "puzzleParts/wonderland/type-36/8.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "8"
      },
      {
          "image": "puzzleParts/wonderland/type-36/9.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "9"
      },
      {
          "image": "puzzleParts/wonderland/type-36/10.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "10"
      },
      {
          "image": "puzzleParts/wonderland/type-36/11.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "11"
      },
      {
          "image": "puzzleParts/wonderland/type-36/12.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "12"
      },
      {
          "image": "puzzleParts/wonderland/type-36/13.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "13"
      },
      {
          "image": "puzzleParts/wonderland/type-36/14.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "14"
      },
      {
          "image": "puzzleParts/wonderland/type-36/15.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "15"
      },
      {
          "image": "puzzleParts/wonderland/type-36/16.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "16"
      },
      {
          "image": "puzzleParts/wonderland/type-36/17.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "17"
      },
      {
          "image": "puzzleParts/wonderland/type-36/18.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "18"
      },
      {
          "image": "puzzleParts/wonderland/type-36/19.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "19"
      },
      {
          "image": "puzzleParts/wonderland/type-36/20.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "20"
      },
      {
          "image": "puzzleParts/wonderland/type-36/21.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "21"
      },
      {
          "image": "puzzleParts/wonderland/type-36/22.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "22"
      },
      {
          "image": "puzzleParts/wonderland/type-36/23.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "23"
      },
      {
          "image": "puzzleParts/wonderland/type-36/24.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "24"
      },
      {
          "image": "puzzleParts/wonderland/type-36/25.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "25"
      },
      {
          "image": "puzzleParts/wonderland/type-36/26.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "26"
      },
      {
          "image": "puzzleParts/wonderland/type-36/27.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "27"
      },
      {
          "image": "puzzleParts/wonderland/type-36/28.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "28"
      },
      {
          "image": "puzzleParts/wonderland/type-36/29.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "29"
      },
      {
          "image": "puzzleParts/wonderland/type-36/30.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "30"
      },
      {
          "image": "puzzleParts/wonderland/type-36/31.png",
          "mode": "portrait",
          "direction": "up",
          "sort_order": "31"
      },
      {
          "image": "puzzleParts/wonderland/type-36/32.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "32"
      },
      {
          "image": "puzzleParts/wonderland/type-36/33.png",
          "mode": "portrait",
          "direction": "up",
          "sort_order": "33"
      },
      {
          "image": "puzzleParts/wonderland/type-36/34.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "34"
      },
      {
          "image": "puzzleParts/wonderland/type-36/35.png",
          "mode": "portrait",
          "direction": "up",
          "sort_order": "35"
      },
      {
          "image": "puzzleParts/wonderland/type-36/36.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "36"
      }
      
  
      ]
    ],
  
    [
      {
        type: 64
      },
      [
        {
          "image": "puzzleParts/wonderland/type-64/1.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "1"
      },
      {
          "image": "puzzleParts/wonderland/type-64/2.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "2"
      },
      {
          "image": "puzzleParts/wonderland/type-64/3.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "3"
      },
      {
          "image": "puzzleParts/wonderland/type-64/4.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "4"
      },
      {
          "image": "puzzleParts/wonderland/type-64/5.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "5"
      },
      {
          "image": "puzzleParts/wonderland/type-64/6.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "6"
      },
      {
          "image": "puzzleParts/wonderland/type-64/7.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "7"
      },
      {
          "image": "puzzleParts/wonderland/type-64/8.png",
          "mode": "portrait",
          "direction": "down",
          "sort_order": "8"
      },
      {
          "image": "puzzleParts/wonderland/type-64/9.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "9"
      },
      {
          "image": "puzzleParts/wonderland/type-64/10.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "10"
      },
      {
          "image": "puzzleParts/wonderland/type-64/11.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "11"
      },
      {
          "image": "puzzleParts/wonderland/type-64/12.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "12"
      },
      {
          "image": "puzzleParts/wonderland/type-64/13.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "13"
      },
      {
          "image": "puzzleParts/wonderland/type-64/14.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "14"
      },
      {
          "image": "puzzleParts/wonderland/type-64/15.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "15"
      },
      {
          "image": "puzzleParts/wonderland/type-64/16.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "16"
      },
      {
          "image": "puzzleParts/wonderland/type-64/17.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "17"
      },
      {
          "image": "puzzleParts/wonderland/type-64/18.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "18"
      },
      {
          "image": "puzzleParts/wonderland/type-64/19.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "19"
      },
      {
          "image": "puzzleParts/wonderland/type-64/20.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "20"
      },
      {
          "image": "puzzleParts/wonderland/type-64/21.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "21"
      },
      {
          "image": "puzzleParts/wonderland/type-64/22.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "22"
      },
      {
          "image": "puzzleParts/wonderland/type-64/23.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "23"
      },
      {
          "image": "puzzleParts/wonderland/type-64/24.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "24"
      },
      {
          "image": "puzzleParts/wonderland/type-64/25.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "25"
      },
      {
          "image": "puzzleParts/wonderland/type-64/26.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "26"
      },
      {
          "image": "puzzleParts/wonderland/type-64/27.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "27"
      },
      {
          "image": "puzzleParts/wonderland/type-64/28.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "28"
      },
      {
          "image": "puzzleParts/wonderland/type-64/29.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "29"
      },
      {
          "image": "puzzleParts/wonderland/type-64/30.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "30"
      },
      {
          "image": "puzzleParts/wonderland/type-64/31.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "31"
      },
      {
          "image": "puzzleParts/wonderland/type-64/32.png",
          "mode": "landscape",
          "direction": "left",
          "sort_order": "32"
      },
      {
          "image": "puzzleParts/wonderland/type-64/33.png",
          "mode": "landscape",
          "direction": "right",
          "sort_order": "33"
      },
      {
          "image": "puzzleParts/wonderland/type-64/34.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "34"
      },
      {
          "image": "puzzleParts/wonderland/type-64/35.png",
          "mode": "moderate",
          "direction": "moderate_horizontal",
          "sort_order": "35"
      },
      {
          "image": "puzzleParts/wonderland/type-64/36.png",
          "mode": "moderate",
          "direction": "moderate_vertical",
          "sort_order": "36"
      },
      {
        "image": "puzzleParts/wonderland/type-64/37.png",
        "mode": "moderate",
        "direction": "moderate_horizontal",
        "sort_order": "37"
    },
    {
        "image": "puzzleParts/wonderland/type-64/38.png",
        "mode": "moderate",
        "direction": "moderate_vertical",
        "sort_order": "38"
    },
    {
        "image": "puzzleParts/wonderland/type-64/39.png",
        "mode": "moderate",
        "direction": "moderate_horizontal",
        "sort_order": "39"
    },
    {
        "image": "puzzleParts/wonderland/type-64/40.png",
        "mode": "moderate",
        "direction": "moderate_vertical",
        "sort_order": "40"
    },
    {
        "image": "puzzleParts/wonderland/type-64/41.png",
        "mode": "moderate",
        "direction": "moderate_vertical",
        "sort_order": "41"
    },
    {
        "image": "puzzleParts/wonderland/type-64/42.png",
        "mode": "moderate",
        "direction": "moderate_horizontal",
        "sort_order": "42"
    },
    {
        "image": "puzzleParts/wonderland/type-64/43.png",
        "mode": "moderate",
        "direction": "moderate_vertical",
        "sort_order": "43"
    },
  
    {
        "image": "puzzleParts/wonderland/type-64/44.png",
        "mode": "moderate",
        "direction": "moderate_horizontal",
        "sort_order": "44"
    },
    {
        "image": "puzzleParts/wonderland/type-64/45.png",
        "mode": "moderate",
        "direction": "moderate_vertical",
        "sort_order": "45"
    },
    {
        "image": "puzzleParts/wonderland/type-64/46.png",
        "mode": "moderate",
        "direction": "moderate_horizontal",
        "sort_order": "46"
    },
    {
        "image": "puzzleParts/wonderland/type-64/47.png",
        "mode": "moderate",
        "direction": "moderate_vertical",
        "sort_order": "47"
    },
    {
        "image": "puzzleParts/wonderland/type-64/48.png",
        "mode": "landscape",
        "direction": "left",
        "sort_order": "48"
    },
    {
        "image": "puzzleParts/wonderland/type-64/49.png",
        "mode": "landscape",
        "direction": "right",
        "sort_order": "49"
    },
    {
        "image": "puzzleParts/wonderland/type-64/50.png",
        "mode": "moderate",
        "direction": "moderate_vertical",
        "sort_order": "50"
    },
    {
        "image": "puzzleParts/wonderland/type-64/51.png",
        "mode": "moderate",
        "direction": "moderate_horizontal",
        "sort_order": "51"
    },
    {
        "image": "puzzleParts/wonderland/type-64/52.png",
        "mode": "moderate",
        "direction": "moderate_vertical",
        "sort_order": "52"
    },
    {
        "image": "puzzleParts/wonderland/type-64/53.png",
        "mode": "moderate",
        "direction": "moderate_horizontal",
        "sort_order": "53"
    },
    {
        "image": "puzzleParts/wonderland/type-64/54.png",
        "mode": "moderate",
        "direction": "moderate_vertical",
        "sort_order": "54"
    },
    {
        "image": "puzzleParts/wonderland/type-64/55.png",
        "mode": "moderate",
        "direction": "moderate_horizontal",
        "sort_order": "55"
    },
    {
        "image": "puzzleParts/wonderland/type-64/56.png",
        "mode": "moderate",
        "direction": "moderate_vertical",
        "sort_order": "56"
    },
    {
        "image": "puzzleParts/wonderland/type-64/57.png",
        "mode": "portrait",
        "direction": "up",
        "sort_order": "57"
    },
    {
        "image": "puzzleParts/wonderland/type-64/58.png",
        "mode": "moderate",
        "direction": "moderate_horizontal",
        "sort_order": "58"
    },
    {
        "image": "puzzleParts/wonderland/type-64/59.png",
        "mode": "portrait",
        "direction": "up",
        "sort_order": "59"
    },
    {
        "image": "puzzleParts/wonderland/type-64/60.png",
        "mode": "moderate",
        "direction": "moderate_horizontal",
        "sort_order": "60"
    },
    {
        "image": "puzzleParts/wonderland/type-64/61.png",
        "mode": "portrait",
        "direction": "up",
        "sort_order": "61"
    },
    {
        "image": "puzzleParts/wonderland/type-64/62.png",
        "mode": "moderate",
        "direction": "moderate_horizontal",
        "sort_order": "62"
    },
    {
        "image": "puzzleParts/wonderland/type-64/63.png",
        "mode": "portrait",
        "direction": "up",
        "sort_order": "63"
    },
    {
        "image": "puzzleParts/wonderland/type-64/64.png",
        "mode": "landscape",
        "direction": "left",
        "sort_order": "64"
    }
      
  
      ]
    ]
  




  ]
    puzzleBody.puzzle_image = file.filename;
    const newPuzzle = new PuzzleList(puzzleBody);
    const result = await newPuzzle.save();
    
    if(result) {
      return {
        success: true,
        message: "Puzzle is Added."
      };
    }

  }

  // @Post('/addPuzzle')
  // async addPuzzle(@Body() body: any, @UploadedFiles('puzzleImages[]') puzzleImages: Express.Multer.File[]) {

  //   const test = [];
  //   for (let index = 0; index < puzzleImages.length; index++) {
  //      fs.writeFileSync(path.join(__dirname,  `../../src/public/uploads/images/${puzzleImages[index].originalname}`), puzzleImages[index].buffer);
  //      test.push(uuidv4() + '-' + Date.now() + path.extname(puzzleImages[index].originalname))
  //   }

  //   const puzzleListSchema = Joi.object({
  //     name: Joi.string().required().label('Name'),
  //     paidOrFree: Joi.string().required().label('Paid or Free'),
  //     type: Joi.string().required().label('Type'),
  //     puzzleType: Joi.string().label('Puzzle Type'),
  //     puzzleImages: Joi.any()
  //   });

  //   const validate = puzzleListSchema.validate(body);
  //   if (validate.error) {
  //     return {
  //       success: false,
  //       message: 'Request data is invalid',
  //       error: validate.error.details.map((d) => d.message),
  //     };
  //   }
  
  //   let checking = body;
  //   checking.puzzleImages = test
    
  //   const newPuzzleList = new PuzzleList(checking);
  //   const response = await newPuzzleList.save();
    
  //   if(response)
  //   return {message: "Saved"};
  // }

  @Get('/puzzleList')
  async getAllPuzzle(typeOfPuzzle: Number) {
     const response = await PuzzleList.aggregate([ {
        '$project': {
          _id: 0,
          puzzle_uuid: 1,
          paid_status: 1, 
          type: 1,
          puzzle_image: {
            $concat: [process.env.IMAGES_BASE_PATH, "$puzzle_image"]
          },
        }
      }
    ]);
     return {
         response,
         message: 'This action returns all the puzzles'
     };
   }
   

  @Post('/oldPuzzleParts')
  @UseBefore(AdminAuthMiddleware)
  async getOldPuzzleParts(@Body() body: any, @UploadedFile("", { }) file: any) {

    const puzzleId = body.puzzleId;

     const response = await PuzzleList.aggregate([ 
      {
        '$match': {
          'puzzle_uuid': puzzleId
        }
      }, 
      {      
        '$project': {
          _id: 0,
          puzzle_uuid: 1,
          type: 1,
          puzzle_parts: 1
        }
      }
    ]);

    let updatedImages = [];

    if (response) {

      for (let index = 0; index < response[0].puzzle_parts.length; index++) {
        updatedImages.push({
            "image": `${process.env.IMAGES_BASE_PATH}${response[0].puzzle_parts[index].image}`,
            "mode": response[0].puzzle_parts[index].mode,
            "direction": response[0].puzzle_parts[index].direction,
            "sort_order": response[0].puzzle_parts[index].sort_order
          })
      }


    updatedImages = updatedImages.sort( () => Math.random() - 0.5) ;


    //   for (var a = 0; a < updatedImages.length; a++) {
    //     var x: any = updatedImages[a];
    //     var y:any = Math.floor(Math.random() * (a + 1));
    //     updatedImages[a] = updatedImages[y];
    //     updatedImages[y] = x;
    // }
  
      const actualResponse = {
            "type": response[0].type,
            "puzzle_uuid":   response[0].puzzle_uuid,
            "puzzle_parts": updatedImages
      }
  
       return {
           response: actualResponse,
           message: 'This action returns all the puzzles parts.'
       };
    } else {
      return {
        message: "Could not found any puzzle part."
      }
    }
 
   }



   @Post('/puzzleParts')
   async getPuzzleParts(@QueryParam('type') type: string, @QueryParam('puzzleId') puzzleId: string, @Body() body: any, @UploadedFile("", { }) file: any) {
 
      const response = await PuzzleList.aggregate(
        
       [
         {
           '$match': {
             'puzzle_uuid': body.puzzleId
           }
         }, {
           '$unwind': {
             'path': '$puzzle_parts'
           }
         }, {
           '$project': {
             'puzzle_type': {
               '$first': '$puzzle_parts'
             }, 
             'puzzle_parts': '$puzzle_parts', 
             '_id': 0, 
             'puzzle_uuid': 1
           }
         }, {
           '$match': {
             'puzzle_type.type': +body.type
           }
         }, {
           '$project': {
             'type': '$puzzle_type.type', 
             'puzzle_uuid': 1, 
             'puzzle_parts': {
               '$last': '$puzzle_parts'
             }
           }
         }
       ]
        
     
     );
 
     const updatedImages = [];
 
     if (response) {
 
       for (let index = 0; index < response[0].puzzle_parts.length; index++) {
         updatedImages.push({
             "image": `${process.env.IMAGES_BASE_PATH}${response[0].puzzle_parts[index].image}`,
             "mode": response[0].puzzle_parts[index].mode,
             "direction": response[0].puzzle_parts[index].direction,
             "sort_order": response[0].puzzle_parts[index].sort_order
           })
       }

   
       const actualResponse = {
             "type": response[0].type,
             "puzzle_uuid":   response[0].puzzle_uuid,
             "puzzle_parts": updatedImages.sort(() => Math.random() - 0.5 ) 

       }
   
        return {
            response: actualResponse,
            message: 'This action returns all the puzzles parts.'
        };
     } else {
       return {
         message: "Could not found any puzzle part."
       }
     }
  
    }










  @Post('/singlePuzzle')
  async getSinglePuzzle(@Body() body: any ) {

    const singlePuzzleSchema = Joi.object({
      id: Joi.string().required().label('Puzzle ID'),
      type: Joi.string().required().label('Puzzle Type'),
  
    });

    const validate = singlePuzzleSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }

    const { id, type } = body;
     
    const puzzleList = await PuzzleList.aggregate([
      {
        '$match': {
          'puzzleId': id
        }
      }, {
        '$project': {
          [type]: 1, 
          "_id": 0
        }
      }
    ])

    // book_image_name: {
    //   $concat: [process.env.IMAGES_BASE_PATH, "$book_image_name"]
    // }

    //const { puzzle } = puzzleList;
     return {
        puzzleList: puzzleList.length > 0 ? puzzleList[0][type] : [],
        message: 'This action returns requested puzzle.'
     };
   }


}





