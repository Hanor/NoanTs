import 'reflect-metadata';
import {ServerConfiguration} from './server.configuration';
import {PropertiesConfiguration} from './properties.configuration';
import {BehaviorSubject} from 'rxjs';
import {NoAnTsConfiguration} from './noandts.configuration';

let instances: Map<string, Object> = new Map<string, Object>();
let applicationContext: NoAnTsConfiguration;

export const READY: BehaviorSubject<boolean> = new BehaviorSubject(false);

export function Application(constructor: Function) {
  if (!instances.has('APPLICATION')) {
    const prototype = Object.create(constructor.prototype);
    let instance = new prototype.constructor(process.argv);
    instances.set('APPLICATION', instance);
  } else {
    throw Error('More than one Application main.');
  }
}
export function Rest(constructor: Function) {}
export function Service(constructor: Function) {}
export function Configuration(constructor: Function) {}
export function Inject(target: any, key: string) {
  const constructor = Reflect.getMetadata("design:type", target, key);
  let instance;
  if (instances.has(constructor.name)) {
    instance = instances.get(constructor.name);
  } else {
    const prototype = Object.create(constructor.prototype);
    instance = new prototype.constructor();
    instances.set(constructor.name, instance);
  }
  Reflect.set(target, key, instance);
}

export function Get(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    READY.subscribe((ready) => {
      if (ready) {
        const serverConfiguration: ServerConfiguration = <ServerConfiguration> instances.get('ServerConfiguration');
        serverConfiguration.context.get(path, (req, res) => {
          res.send(target[propertyKey](req.query));
        })
      }
    })
  };
}
export function Post(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    READY.subscribe((ready) => {
      if (ready) {
        const serverConfiguration: ServerConfiguration = <ServerConfiguration> instances.get('ServerConfiguration');
        serverConfiguration.context.post(path, (req, res) => {
          res.send(target[propertyKey](req.body));
        })
      }
    })
  };
}
