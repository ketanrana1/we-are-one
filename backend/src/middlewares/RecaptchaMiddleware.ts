import {
  ExpressMiddlewareInterface,
} from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

class RecaptchaMiddleware implements ExpressMiddlewareInterface {

  async use(request: Request, response: Response, next: NextFunction) {
    const responseCode = request.body.recaptcha;
    const remoteip = request.headers && request.headers['x-forwarded-for'] ? request.headers['x-forwarded-for'] : request.connection.remoteAddress;
    const endpoint = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${responseCode}&remoteip=${remoteip}`;
    const { data } = await axios.post(endpoint, {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    });
    if (data.success) {
      return next();
    }
    return response.json({
      success: false,
      message: 'Invalid Recaptcha',
    });
  }

}

export default RecaptchaMiddleware;
