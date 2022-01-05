import { NextFunction, Response, Request } from 'express';
const jwt = require('jsonwebtoken');
import userModel from '../models/users';

async function AdminAuthMiddleware(request: Request, response: Response, next: NextFunction) {

  const session = request.headers.authorization;

  if (session && session) {  
    const secret = process.env.API_SECRET;

    try {
      const verificationResponse = jwt.verify(session, secret);

      const id = verificationResponse.id; 

      const user = await userModel.find({ userId : id , role: "admin"})

      if (user.length === 1) {
        request.user = user;
        next();
      } else {
        response.redirect(`${process.env.FRONTEND_BASE_URL}`);
      }
    } catch (error) {
        response.redirect(`${process.env.BACKEND_BASE_URL}`);
    }
  } 
  else {
    response.redirect(`${process.env.BACKEND_BASE_URL}`);
    return {message: "do it"};
  }
}

export default AdminAuthMiddleware;