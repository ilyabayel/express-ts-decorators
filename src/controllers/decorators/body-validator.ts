import 'reflect-metadata';
import {MetadataKeys} from '../../enums/MetadataKeys';

export function BodyValidator(...keys: string[]) {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    Reflect.defineMetadata(MetadataKeys.Validator, keys, target, key);
  };
}
