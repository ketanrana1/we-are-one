import { UploadedFile, Body, Get, Post, QueryParam, Req, Res, Controller } from 'routing-controllers';
import User from '../models/users';
import Order from '../models/order'
import Joi from 'joi';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Controller('/api')
export class RegisterController {

 @Get('/users')
 async getAll() {
    const users = await User.aggregate([
      {
        '$project': { 
          _id: 0, 
        } 
      }
    ]);
    return {
        users,
        message: 'This action returns all users'
    };
  }

  @Post('/profile')
 async getUserProfile(@Body() body: any, @UploadedFile("", { }) file: any) {

  const userSchema = Joi.object({
    userId: Joi.string().required().label('User Id')
  });

  const validate = userSchema.validate(body);
  if (validate.error) {
    return {
      success: false,
      message: 'Request data is invalid',
      error: validate.error.details.map((d) => d.message),
    };
  }

    const { userId } = body;
    const profileDetails = await User.aggregate([
      {
        '$match': {
          'userId': userId
        }
      }, {
        '$project': { 
          _id: 0,
          userId: 0,
          password: 0
        }
      }
    ]);
    return {     
        message: 'This action returns user profile details',
        errror: "false",
        is_paid: "false",
    }; 
  }


  @Get('/userDetails')
 async getUserDetails(@QueryParam('id') id: string, @Body() body: any, @UploadedFile("", { }) file: any) {

  const userDetails = await User.aggregate([
    {
      '$match': {
        'userId': id
      }
    }, {
      '$project': {
        '_id': 0,
        'firstName': 1, 
        'lastName': 1, 
        'email': 1, 
        'telephone': 1, 
        'address_1': 1, 
        'address_2': 1, 
        'city': 1, 
        'zip': 1, 
        'state': 1, 
        'country': 1
      }
    }
  ]);
   return {

    userDetails,
    message: 'This action returns shipping details for the user saved.'
       
   }; 


  }



  @Get('/account')
  async getAccountDetails(@QueryParam('id') id: string, @Body() body: any, @UploadedFile("", { }) file: any) {
 
     const allOrderDetails = await Order.aggregate([
      {
        '$match': {
          'userId': id,
          'status': 'Completed'
        }
      }, {
        '$project': {
          '_id': 0,
          'orderId': 1, 
          'total_amount': 1,   
          'ordered_items': 1, 
          'shipping_cost': 1
        }
      }
    ]);
     return {

      allOrderDetails,
      message: 'This action returns all orders for a single user'
         
     }; 
   }


  @Post('/register')
  async post(@Body() body: any,  @UploadedFile("", { }) file: any) {

    const userSchema = Joi.object({
      firstName: Joi.string().required().label('First Name'),
      lastName: Joi.string().required().label('Last Name'),
      email: Joi.string().email().required().label('Email'),
      telephone: Joi.number().label('Telephone'),
      fax: Joi.number().label('Fax'),
      company: Joi.string().label('Company'),
      companyId: Joi.string().label('Company ID'),
      address_1: Joi.string().label('Adress 1'),
      address_2: Joi.string().label('Adress 2'),
      city: Joi.string().label('City'),
      post_code: Joi.string().label('Post Code'),
      country: Joi.string().label('Country'),
      state: Joi.string().label('Region/State'),
      password: Joi.string().required().label('Password'),
    });

    const validate = userSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }

    const userData = await User.findOne({ email:body.email } );

    if(userData)
      return { 
        message: "Email already exists",
        error: "true",
        success: "false"
      }

      const newBody = body

    newBody.role = "user"
    newBody.is_paid = "false"

    const newUser = new User(newBody);
    const response = await newUser.save();

    const newUserData = await User.findOne({ email:body.email } );
    
    if(response) {
        var token = jwt.sign({
          id: newUser.id
        }, process.env.API_SECRET, {
          expiresIn: 86400
        });

        return {
          message: "Registration Completed",
          success: "true",
          userId: newUserData.userId,
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          email: newUserData.email,
          telephone: newUserData.telephone,
          response: {
            token: token,
            is_paid: "false"
          },         
      };  
    }
  }


  @Post('/logout')
  async logout( @Body() body: any, @Req() req: any, @Res() res: any ) {

    return {
      message: "Response"
    }

   }


   @Post('/admin-logout')
   async adminLogout( @Body() body: any, @Req() req: any, @Res() res: any ) {
 
     return {
       message: "Response"
     }

 
    }


   
  @Post('/login')
  async login(@Body() body: any, @UploadedFile("", { }) file: any ):Promise<any> {


    const loginUserSchema = Joi.object({
      email: Joi.string().email().label('Email'),
      password: Joi.string().label('Password'),
    });

    const validate = loginUserSchema.validate(body);
    if (validate.error) {
      return {
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
        success: false,
      };
    }

    try {
      const user = await User.findOne({
        email: body.email
      })

      if(!user) {
        return {
          message: "User does not exist!",
          error: "true",
          success: "false"
        }
      }

      var passwordIsValid = bcrypt.compareSync(
        body.password,
        user.password
      );

      if (!passwordIsValid) {
      return {
          accessToken: null,
          message: "Invalid Password!",
          error: "true",
          success: "false"
        };
      }

      var token = jwt.sign({
        id: user.id
      }, process.env.API_SECRET, {
        expiresIn: 86400
      });

      return {

          message: "Login successfully",
          success: "true",
          response: {
            token: token,
            is_paid: "false"
          },

          user: {
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          },      
      };      
    } catch (error) {
      console.log("ERROR", error)
    }
  }



  @Post('/admin-login')
  async adminLogin(@Body() body: any, @UploadedFile("", { }) file: any ):Promise<any> {


    const loginUserSchema = Joi.object({
      email: Joi.string().email().label('Email'),
      password: Joi.string().label('Password'),
    });

    const validate = loginUserSchema.validate(body);
    if (validate.error) {
      return {
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
        success: false,
      };
    }

    try {
      const user = await User.findOne({
        email: body.email,
        role: "admin"
      })

      if(!user) {
        return {
          message: "User does not exist!",
          error: "true",
          success: "false"
        }
      }

      var passwordIsValid = bcrypt.compareSync(
        body.password,
        user.password
      );

      if (!passwordIsValid) {
      return {
          accessToken: null,
          message: "Invalid Password!",
          error: "true",
          success: "false"
        };
      }

      var token = jwt.sign({
        id: user.userId,
        role: "admin"
      }, process.env.API_SECRET, {
        expiresIn: 86400
      });

      return {

          message: "Login successfully",
          token: token,
          userId: user.userId,
          email: user.email,
          role: user.role       
      }; 
      
      
    } catch (error) {
      console.log("ERROR", error)
    }
  }



}