import * as fs from 'fs';
import * as yaml from 'js-yaml';

export class Properties {
    DEFAULT_PROPERTIES_FILE: string = 'application.properties.yml';
    doc: any;
    constructor(private args: Array<string>) {
        this.getPropertiesFilePath();
    }
    getPropertiesFilePath() {
        const propertiesFile = this.args.filter((arg: string) => {
            return arg.includes('--properties');
        })
        
        if (propertiesFile.length > 1 )  {
            throw new Error('More than one properties file!');
        }

        if (propertiesFile.length === 0) {
            this.loadPropertes(this.DEFAULT_PROPERTIES_FILE);
        } else {
            this.loadPropertes(propertiesFile[0].split('=')[1]);
        }
    }
    loadPropertes(filePath: string) {
        try {
            this.doc = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.error('Properties file not found!');
            throw e;
        }
    }
}