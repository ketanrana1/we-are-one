import { NextFunction, Response, Request } from 'express';
const jwt = require('jsonwebtoken');
import userModel from '../models/users';

async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {

  const session = request.headers.authorization;
  if (session && session) {
    const secret = process.env.API_SECRET;
    try {
      const verificationResponse = jwt.verify(session, secret) ;
      // console.log(verificationResponse)
      const id = verificationResponse.id;
      // console.log(id)
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        if(user.role == "admin") {
            next();
        }     
      } else {
        response.redirect(`${process.env.FRONTEND_BASE_URL}`);
      }
    } catch (error) {
        response.redirect(`${process.env.FRONTEND_BASE_URL}`);
    }
  } else {
    response.redirect(`${process.env.FRONTEND_BASE_URL}`);
    return {message: "do it"};
  }
}

export default AuthMiddleware;