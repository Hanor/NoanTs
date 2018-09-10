import { Properties } from './properties';

export class System {
    private properties: Properties;
    
    constructor(private args: Array<string>) {
        this.loadProperties();
    }
    loadProperties() {
        this.properties = new Properties(this.args);
    }
}