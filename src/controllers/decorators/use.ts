import 'reflect-metadata';
import {RequestHandler} from 'express';
import {MetadataKeys} from '../../enums/MetadataKeys';

export function Use(middleware: RequestHandler) {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    const middlewares = Reflect.getMetadata(MetadataKeys.Middleware, target, key) ?? [];
    Reflect.defineMetadata(MetadataKeys.Middleware, [...middlewares, middleware], target, key);
  };
}
