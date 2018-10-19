import {Application, Inject} from './configuration/noants/decorators';
import {NoAnTsConfiguration} from './configuration/noants/noandts.configuration';

import {ExampleRest} from './example/example.rest';
import { UserRest } from './user/user.rest';

@Application
export class Main {

  @Inject applicationContext: NoAnTsConfiguration;
  @Inject userRest: UserRest;

  constructor(private args: Array<string>) {
    this.applicationContext.run(args);
  }
}
