import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SortMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.locals._sort = {
      enabled: false,
      type: 'default',
    };
    if (req.query.hasOwnProperty('_sort')) {
      console.log(req.query);

      Object.assign(res.locals._sort, {
        enabled: true,
        column: req.query.column,
        type: req.query.type,
      });
    }
    if (req.query.hasOwnProperty('_sortTrash')) {
      Object.assign(res.locals._sort, {
        enabled: true,
        column: req.query.column,
        type: req.query.type,
      });
    }
    next();
  }
}
