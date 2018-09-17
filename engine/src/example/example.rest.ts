import {Rest, Get, Inject, Post} from '../configuration/noants/decorators';

import { ExampleService } from './example.service';
import { ExampleEntity } from './example.entity';

@Rest
export class ExampleRest {

  @Inject exampleService: ExampleService;

  @Get('/api/getExample')
  exampleGet(query: any): ExampleEntity {
      const example: ExampleEntity = this.exampleService.getAllById(query.id);
      if (!example) {
          throw new Error('Example ' + query.id + ', not found.');
      }
      return example;
  }
  @Post('/api/postExample')
  examplePost(example: ExampleEntity) {
      console.log(example);
  }
}
