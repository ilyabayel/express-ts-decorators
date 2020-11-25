import 'reflect-metadata';
import {AppRouter} from '../app-router';
import {HttpMethods} from '../../enums/HttpMethods';

export function Controller(routePrefix = '/') {
  return (target: Function): void => {
    const router = AppRouter.instance;
    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata('path', target.prototype, key);
      const method: HttpMethods = Reflect.getMetadata('method', target.prototype, key);

      if (!path || !method) return;
      router[method](`${routePrefix}${path}`, routeHandler);
    }
  };
}
