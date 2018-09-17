import {Service} from '../configuration/noants/decorators';

import { ExampleEntity } from './example.entity';

@Service
export class ExampleService {
    constructor() {};

    getAllById(id: number) {
        return new ExampleEntity('example', id);
    }
    saveExample(example: ExampleEntity) {
        return 'saved!';
    }
}
