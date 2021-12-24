import { JsonController, Param, UploadedFile, Body, Get, Post, Put, Delete, Req, Res, Controller } from 'routing-controllers';
import User from '../models/users';
import Joi from 'joi';
import { Mongoose } from 'mongoose';
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

  @Get('/profile')
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
        is_paid: "true",
    };
  }

  @Post('/register')
  async post(@Body() body: any,  @UploadedFile("", { }) file: any) {

    const userSchema = Joi.object({

      firstName: Joi.string().required().label('First Name'),
      lastName: Joi.string().required().label('Last Name'),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Email'),
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
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).label('Password'),
    });

    const validate = userSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }

    const userData = await User.findOne({ email:body.email });

    if(userData)
      return { 
        message: "Email already exists",
        error: "true",
        success: "false"
      }

    const newUser = new User(body);
    const response = await newUser.save();
    
    if(response) {
        var token = jwt.sign({
          id: newUser.id
        }, process.env.API_SECRET, {
          expiresIn: 86400
        });

        return {
          message: "Registration Completed",
          success: "true",
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

  //   var sess = req.session.token;

  //   if(sess){
  //     req.session.token = null;
  //     return {'success': true, "message": "user logout successfully"};
  // }

  // return {'success': true, "message": "user logout successfully"};


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
            fullName: user.fullName,
            user: user
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
            fullName: user.fullName,
          },
          
          
      };      
    } catch (error) {
      console.log("ERROR", error)
    }
  }



}