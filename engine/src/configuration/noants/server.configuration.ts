import {PropertiesConfiguration} from './properties.configuration'
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';

export class ServerConfiguration {

    context: any;
    filesPath: string;
    port: number;

    constructor(){};

    configure(port: number, filesPath: string) {
      this.filesPath = filesPath;
      this.port = port;
      this.context = express();
      this.context.use(express.static( this.filesPath ));
      this.context.use(morgan('dev'));
      this.context.use(bodyParser.urlencoded({'extended': true}));
      this.context.use(bodyParser.json());
      this.context.use(bodyParser.json({ type: 'application/vnd.api+json' }));
      this.context.use(methodOverride());
      this.start();
    }
    initializeAngularRoutes() {
      this.context.get('/*', (req, res, next) => {
        if (!req.path.includes('/api/')) {
          res.sendfile(this.filesPath + '/index.html');
        }
      })
    }
    start() {
        this.context.listen(this.port, () => {
            console.log(`Listening at http://localhost:${this.port}/`);
            this.initializeAngularRoutes();
        })
    }
}
