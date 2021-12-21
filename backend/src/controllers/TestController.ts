import Test from '../models/test';

import { JsonController, Put, Controller, UploadedFiles,   UseBefore, UseAfter, Body, Get, Post,  Req, Res, BodyParam, UploadedFile, Delete, Param, QueryParam} from 'routing-controllers';
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
      cb(null, file.originalname)
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
    }
});

 

 
@Controller('/api')
export class TestController {

  @Post('/addTest')
  @UseBefore(
      multer( fileUploadOptions() ).fields([
          { maxCount: 1, name: 'image' },
          { maxCount: 1, name: 'video' },
      ]),
  )
  async handleImageUpload(@Body() body: any, @Req() req:any, @Res() res:any) {


    let testBody = body; 

    const test = testBody.test;
    const testTwo = testBody.test_two;

    const mainTest = {
      "testNameOne": test,
      "testNameTwo": testTwo
    }
    console.log("BOOTY",body);
    console.log("SHAKE",mainTest);
    testBody.new_image = mainTest;
    testBody.image_name = req.files.image[0].originalname;
    testBody.video_name = req.files.video[0].originalname;

    const newTest = new Test(testBody);
    const response = await newTest.save();

    if(response) {
      return {
        success: true,
        message: "Test is Added."
      };
    }

  }


}


















































// import Test from '../models/test';

// import { JsonController, Put, Controller, UploadedFiles,   UseBefore, UseAfter, Body, Get, Post,  Req, Res, BodyParam, UploadedFile, Delete, Param, QueryParam} from 'routing-controllers';
// import Joi from 'joi';
// var bodyParser = require('body-parser')
// import multer from 'multer';
// var path = require('path'); 
// const {v4 : uuidv4} = require('uuid')



// const fileUploadOptions = ( ) => ({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,  "../../src/public/uploads/images"))
//     },
    
//     filename: function (req: any, file: any, cb: any) {
//       cb(null, file.originalname)
//     }
//   }),
//   fileFilter: (req: any,file: any,cb: any) => {
//     if(file.mimetype === "image/jpg"  || 
//        file.mimetype ==="image/jpeg"  || 
//        file.mimetype ===  "image/png"){
     
//     cb(null, true);
//    } else {
//         cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
//       }
//     }
// });

 

 
// @Controller('/api')
// export class TestController {

//   @Post('/addTest')
//   @UseBefore(
//       multer( fileUploadOptions() ).fields([
//           { maxCount: 1, name: 'image' },
//           { maxCount: 1, name: 'video' },
//       ]),
//   )
//   async handleImageUpload(@Body() body: any, @Req() req:any, @Res() res:any) {

//     const fileOne = req.files.image[0];
//     const fileTwo = req.files.video[0];
//     let testBody = body; 

//     const test = testBody.test;

//     console.log(test);
//     console.log(fileOne);
//     console.log(fileTwo);

//     testBody.image_name = req.files.image[0].originalname;
//     testBody.video_name = req.files.video[0].originalname;

//       const newTest = new Test(testBody);
//       const response = await newTest.save();

//       if(response) {
//         return {
//           success: true,
//           message: "Test is Added."
//         };
//       }

//   }


// }