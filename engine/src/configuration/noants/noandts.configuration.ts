import {ServerConfiguration} from './server.configuration';
import {PropertiesConfiguration} from './properties.configuration';
import {BehaviorSubject} from 'rxjs';
import {Inject, READY} from './decorators'

export class NoAnTsConfiguration {
  @Inject propertiesConfiguration: PropertiesConfiguration;
  @Inject serverConfiguration: ServerConfiguration;

  constructor(){}

  run(args: Array<string>) {
    if (!READY.getValue()) {
      this.propertiesConfiguration.loadPropertes(null);
      this.serverConfiguration.configure(this.propertiesConfiguration.getServerPort(), this.propertiesConfiguration.getFilePath());
      READY.next(true);
    }
  }
}
