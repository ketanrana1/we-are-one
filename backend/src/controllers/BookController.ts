import Book from '../models/book';
import { JsonController, Put, Controller, UseBefore, UseAfter, Body, Get, Post,  Req, Res, BodyParam, UploadedFile, Delete, Param, QueryParam} from 'routing-controllers';
import Joi from 'joi';
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
export class BookController {

  @Post('/addBook')
  async postBook( @Body() body: any, 
    @UploadedFile("book_image", { options: fileUploadOptions() }) file : any ) {

    console.log("file", file)

    const bookSchema = Joi.object({
     
      book_name: Joi.string().required().label('Book Name'),
      slug: Joi.string().required().label('Slug'),
      book_description: Joi.string().required().label('Book Description'),
      book_price: Joi.number().required().label('Book Price'),
      book_status: Joi.number().required().label('Book Status'),
      book_content: Joi.string().required().label('Book Content'),
      book_image: Joi.any().label('Book Image'),
      book_image_name: Joi.any(),
      book_download: Joi.string().required().label('Book Download'),
      book_quantity: Joi.number().required().label('Book quantity')

    });
  
    const validate = bookSchema.validate(body);

    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),  
      };
    }

    let bookBody = body; 
    bookBody.book_image_name = file.filename;
  
    const newBook = new Book(bookBody);
    const result = await newBook.save();
    
    if(result) {
      return {
        success: true,
        message: "Book is Added."
      };
    }

  }











  @Post('/books/editBook/')
  async editBook( @Body() body: any, @Req() request: any, @QueryParam('id') id: string,
  @UploadedFile("book_image", { options: fileUploadOptions() }) file : any ) {

    const bookSchema = Joi.object({
     
      book_name: Joi.string().label('Book Name'),
      slug: Joi.string().required().label('Slug'),
      book_description: Joi.string().label('Book Description'),
      book_price: Joi.number().label('Book Price'),
      book_status: Joi.number().label('Book Status'),
      book_content: Joi.string().label('Book Content'),
      book_image: Joi.any().label('Book Image'),
      book_image_name: Joi.any(),
      book_download: Joi.string().label('Book Download'),
      book_quantity: Joi.number().label('Book quantity')
    });
 
    const validate = bookSchema.validate(body);

    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),  
      };
    }

      

    if ( file === undefined || file == null  || Object.keys(file).length === 0 ) {          
      const response = await Book.findOneAndUpdate({ "bookId": id }, { 
      book_name: body.book_name,
      slug: body.slug,
      book_description: body.book_description,
      book_quantity: body.book_quantity,
      book_price: body.book_price,
      book_status: body.book_status,
      book_content: body.book_content,
      book_download: body.book_download
      });
    
      if(response){
      return { message: "Book is updated." };
      }  
    } else {
      let bookBody = body; 
      bookBody.book_image_name = file.filename;    
      const response = await Book.findOneAndUpdate({ "bookId": id }, { 
      book_name: bookBody.book_name,
      slug: body.slug,
      book_description: bookBody.book_description,
      book_quantity: bookBody.book_quantity,
      book_price: bookBody.book_price,
      book_status: bookBody.book_status,
      book_content: bookBody.book_content,
      book_download: bookBody.book_download,
      book_image_name: bookBody.book_image_name
      });
      if(response){
      return { message: "Book is updated." };
      }   
    }
}




 










  @Get('/books/singleBook/')
  async getSingleBook( @QueryParam('id') id: string, ) {

    const singleBook = await Book.aggregate([
      {
        '$match': {
          'bookId': id
        }
      }, {
        '$project': { 
          _id: 0,
          book_name:1,
          slug: 1,
          book_description:1,
          book_quantity:1,
          book_image:1,
          book_price:1,
          book_status:1,
          book_content:1,
          book_download:1,
          book_image_name: {
            $concat: [process.env.IMAGES_BASE_PATH, "$book_image_name"]
          }
        }
      }
    ]);

    return {
      singleBook,
      message: 'This action returns single book details'
  };
  }


  @Get('/books/singleBookDetails/')
  async getSingleBookDetails( @QueryParam('id') id: string, ) {

    const singleBook = await Book.aggregate([
      {
        '$match': {
          'slug': id
        }
      }, {
        '$project': { 
          _id: 0,
          book_name:1,
          slug: 1,
          book_description:1,
          book_quantity:1,
          book_image:1,
          book_price:1,
          book_status:1,
          book_content:1,
          book_download:1,
          book_image_name: {
            $concat: [process.env.IMAGES_BASE_PATH, "$book_image_name"]
          },bookId:1
        }
      }
    ]);

    return {
      singleBook,
      message: 'This action returns single book details'
  };
  }


  // @Get('/books/singleBook/')
  // async getAdfdsfllBooks() {
  //    return {
  
  //        message: 'This gffdgfdg action returns all the books'
  //    };
  //  }

  

  @Get('/allBooks')
  async getAllBooks() {
     const response = await Book.aggregate([
      {
        '$project': { 
          _id: 0,
          book_name:1,
          slug: 1,
          book_description:1,
          book_quantity:1,
          book_image_name: {
            $concat: [process.env.IMAGES_BASE_PATH, "$book_image_name"]
          },
          book_price:1,
          book_status:1,
          book_content:1,
          book_download:1,
          bookId:1
        }
      }
    ]);
     return {
         response, 
        //  book,
         message: 'This action returns all the books'
     };
   }


  //  @Post('/book/delete')
  //  async removeBook(@Body() body: any) {

  //  return {
  //    "test": "werwerer"
  //  }

   @Post('/books/delete/:id')
   public async removeBook(@Param('id') id: string) {


    const bookDeleted = await Book.deleteOne({ bookId : id });

    if(bookDeleted) {
      return {
        success: true,
        message: 'Book is deleted',
      }
    } else {
      return {
        success: false,
        message: 'Could not delete the book',
      }
    }
   }


  //  @Post('/book/delete?test=:check')
  //   async removeBook(@QueryParam('test') test: any) {

  //     console.log("id",test)

  //   // const bookDeleted = await Book.deleteOne({ bookId : id });

  //   return {
  //     "test": test
  //   } 

    // if(bookDeleted) {
    //   return {
    //     success: true,
    //     message: 'Book is deleted',
    //   }
    // } else {
    //   return {
    //     success: false,
    //     message: 'Could not delete the book',
    //   }
    // }

      // return userRepository.removeById(id);
    // }
}

