import { JsonController, Param, Body, Get, Post, Put, Delete, Res } from 'routing-controllers';
import User from '../models/users';
import Joi from 'joi';
import Order from '../models/order';


@JsonController('/api')
export class OrderController {


  @Post('/addOrder')
  async post(@Body() body: any, user: any) {

    const orderSchema = Joi.object({

      order_amount: Joi.string().required().label('Order Amount'),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Email'),
      userId: Joi.string().required().label('User ID'),
      books: Joi.string().label('Book'),
      // books: Joi.string().label('Book'),
      quantity: Joi.number().label('Quantity'),
      orderStatus: Joi.string(),
      
    });
    

    const validate = orderSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }

    const newOrder = new Order(body);
    newOrder.userId = "8ff33afc-268b-4604-8511-b564feb4f94c";
    const response = await newOrder.save();
    
    if(response)
    return {message: "Saved"};
  }

  @Get('/order')

  async getsingleOrder(@Body() body: any) {

    const singleOrderSchema = Joi.object({

      id: Joi.string().required().label('Book ID'),
    });

    const validate = singleOrderSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }


    const { id } = body;
    const singleOrder = await Order.aggregate([
      {
        '$match': {
          'orderId': id
        }
      }, {
        '$unwind': '$userId'
      }, {
        '$lookup': {
          'from': User ? 'users' : "test", 
          'localField': 'userId', 
          'foreignField': 'userId', 
          'as': 'userDetail'
        }
      }, {
        '$unwind': '$userDetail'
      }, {
        '$project': {
          '_id': 0, 
          'userDetail._id': 0
        }
      }
    ]);

    return {
      singleOrder,
      message: 'This action returns single order details'
    };
  }

}






