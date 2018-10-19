import 'reflect-metadata';
import {ServerConfiguration} from './server.configuration';
import {PropertiesConfiguration} from './properties.configuration';
import {BehaviorSubject} from 'rxjs';
import {NoAnTsConfiguration} from './noandts.configuration';
import { AuthenticationService } from '../../authentication/authentication.service';

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
export function Repository(constructor: Function) {}
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
export function Get(args: Array<any>) {
  let path: string = args[0];
  let auth: boolean = args[1];
  let role: string = args[2];
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    READY.subscribe((ready) => {
      if (ready) {
        const serverConfiguration: ServerConfiguration = <ServerConfiguration> instances.get('ServerConfiguration');
        serverConfiguration.context.get(path, (req, res) => {
          let executionMessage: string = canExecute(auth, role, req, res);
          if (executionMessage === 'authorized') {
            try {
              if (path.includes(':')) {
                const result: any = target[propertyKey](req.param[path.split(':')[1]]);
                res.send(result);
              } else {
                const result: any = target[propertyKey](req.query);
                res.send(result);
              }
            } catch (ex) {
              res.status('500').send(ex.message);
              console.error(ex);
            }
          } else {
            res.status('401').send(executionMessage);
            console.error(executionMessage);
          }
        })
      }
    })
  };
}
export function Post(args: Array<any>) {
  let path: string = args[0];
  let auth: boolean = args[1];
  let role: string = args[2];
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    READY.subscribe((ready) => {
      if (ready) {
        const serverConfiguration: ServerConfiguration = <ServerConfiguration> instances.get('ServerConfiguration');
        serverConfiguration.context.post(path, (req, res) => {
          let executionMessage: string = canExecute(auth, role, req, res);
          if (executionMessage === 'authorized') {
            try {
              res.send(target[propertyKey](req.body));
            } catch (ex) {
              res.status('500').send(ex.message);
              console.error(ex);
            }
          } else {
            res.status('401').send(executionMessage);
            console.error(executionMessage);
          }
        })
      }
    })
  };
}


/*
*
* States
*/
function canExecute(auth: boolean, role: string, req: any, res: any): string {
  const authenticationService: AuthenticationService = <AuthenticationService> instances.get('AuthenticationService');
  if (auth) {
    return verifyToken(req, authenticationService);
  }
  return 'authorized';
}
function verifyToken(req: any, authenticationService: AuthenticationService): string {
  let token = req.headers.authorization;
  if (token) {
    token = token.replace('Bearer ', '');
    return (authenticationService.isTokenValid(token)) ? 'authorized' : 'Token is not valid.';
  } else {
    return 'Token Not Found.'
  }
  
}