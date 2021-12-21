import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

@Middleware({
  type: 'before',     
  priority: 5,
})
export default class BodyParser implements ExpressMiddlewareInterface {

  private jsonBodyParser;

  constructor() {
    this.jsonBodyParser = json();
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.jsonBodyParser(req, res, next);
  }
 
}