import 'reflect-metadata';
import {HttpMethods} from '../../enums/HttpMethods';

function routeBinder(method: string) {
  return (path: string) => (target: any, key: string, desc: PropertyDescriptor) => {
    Reflect.defineMetadata('path', path, target, key);
    Reflect.defineMetadata('method', method, target, key);
  };
}

export const Get = routeBinder(HttpMethods.Get);
export const Head = routeBinder(HttpMethods.Head);
export const Post = routeBinder(HttpMethods.Post);
export const Put = routeBinder(HttpMethods.Put);
export const Patch = routeBinder(HttpMethods.Patch);
export const Delete = routeBinder(HttpMethods.Delete);
export const Connect = routeBinder(HttpMethods.Connect);
export const Options = routeBinder(HttpMethods.Options);
export const Trace = routeBinder(HttpMethods.Trace);
