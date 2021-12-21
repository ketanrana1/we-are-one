import PuzzleList from '../models/puzzleList';
import { JsonController, Req, Res, Body, Get, Post, Put, Delete, QueryParam, UploadedFile, UploadedFiles, Controller, UseBefore } from 'routing-controllers';
import Joi from 'joi';
import multer from 'multer';
var path = require('path');
const {v4 : uuidv4} = require('uuid');


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


    console.log("FILE", body.puzzle_parts);

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
  async postPuzzle( @Body() body: any, 
    @UploadedFile("puzzle_image_file", { options: fileUploadOptions() }) file : any ) {
    
      console.log("FILE", body.puzzle_parts)

    const puzzleListSchema = Joi.object({
     
      puzzle_image_file: Joi.any().label('Puzzle Image'),
      puzzle_image: Joi.any(),
      puzzle_parts: Joi.any(),
      paid_status: Joi.string().required().label('Paid Status'),
      type: Joi.string().required().label('Type')

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

  //   const new_puzzle_parts = [
  //     {
  //         image: "http://192.168.10.196:4000/videos/images/7cc08458-3702-4765-b3b7-aede33e8115d-1638519189278.png",
  //         mode: "Potrait",
  //         direction: "Left Top",
  //         sort_order: "1"
  //     },
  //     {
  //         image: "http://192.168.10.196:4000/videos/images/7cc08458-3702-4765-b3b7-aede33e8115d-1638519189278.png",
  //         mode: "Potrait",
  //         direction: "Right Top",
  //         sort_order: "2"
  //     },
  //     {
  //         image: "http://192.168.10.196:4000/videos/images/7cc08458-3702-4765-b3b7-aede33e8115d-1638519189278.png",
  //         mode: "Potrait",
  //         direction: "Bottom Left",
  //         sort_order: "3"
  //     },
  //     {
  //         image: "http://192.168.10.196:4000/videos/images/7cc08458-3702-4765-b3b7-aede33e8115d-1638519189278.png",
  //         mode: "Potrait",
  //         direction: "Bottom Right",
  //         sort_order: "4"
  //     }
  // ]


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
  //   console.log("NEW PUZZLE LIST", newPuzzleList)
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
   

  @Post('/puzzleParts')
  async getPuzzleParts(@Body() body: any, @UploadedFile("", { }) file: any) {

    const puzzleId = body.puzzleId;

    console.log('IDDDDDDDD', puzzleId);


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
     return {
         response,
         message: 'This action returns all the puzzles parts.'
     };
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
    console.log("TEST",puzzleList )
    //const { puzzle } = puzzleList;
     return {
        puzzleList: puzzleList.length > 0 ? puzzleList[0][type] : [],
        message: 'This action returns requested puzzle.'
     };
   }


}





