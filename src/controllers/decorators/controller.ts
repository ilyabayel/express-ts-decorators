import 'reflect-metadata';
import {StatusCodes} from 'http-status-codes';
import {AppRouter} from '../app-router';
import {HttpMethods} from '../../enums/HttpMethods';
import {MetadataKeys} from '../../enums/MetadataKeys';
import {NextFunction, RequestHandler, Response, Request} from 'express';

export function Controller(routePrefix = '/') {
  return (target: Function): void => {
    const router = AppRouter.instance;
    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.Path, target.prototype, key);
      const method: HttpMethods = Reflect.getMetadata(MetadataKeys.Method, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) ?? [];
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.Validator, target.prototype, key) ?? [];

      const validator = bodyValidators(requiredBodyProps);

      if (!path || !method) return;

      router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
    }
  };
}

function bodyValidators(keys: string[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      res.status(StatusCodes.BAD_REQUEST).send('No "body" field in request object!');
      return;
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(StatusCodes.BAD_REQUEST).send(`Missing property "${key}"`);
        return;
      }
    }

    next();
  };
}
