import 'reflect-metadata';
import {HttpMethods} from '../../enums/HttpMethods';

function routeBinder(method: string) {
  return (path: string) => (target: any, key: string, desc: PropertyDescriptor) => {
    Reflect.defineMetadata('path', path, target, key);
    Reflect.defineMetadata('method', method, target, key);
  };
}

export const Get = routeBinder(HttpMethods.get);
export const Head = routeBinder(HttpMethods.head);
export const Post = routeBinder(HttpMethods.post);
export const Put = routeBinder(HttpMethods.put);
export const Patch = routeBinder(HttpMethods.patch);
export const Delete = routeBinder(HttpMethods.delete);
export const Connect = routeBinder(HttpMethods.connect);
export const Options = routeBinder(HttpMethods.options);
export const Trace = routeBinder(HttpMethods.trace);
