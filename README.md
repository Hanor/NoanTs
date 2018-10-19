## NoanTs

This boilerplate was created to help developers to build an application with Angular as frontend and
node.js with Typescript as backend. Also, the backend will serve the angular build files.

## Install

You should install the environment projects dependencies, so:

 - Node.js;
 - NPM;
 - @angular/cli (npm install -g @angular/cli);
 - typescript (npm install -g typescript);

Then run npm install. Now you can desenvolve your application.

## Application properties

This library use `.yml` properties files. The library will use the `application.properties.yml` into the root of the project by default. Also, you can pass the file property in a command line.

## Backend - Rest and Decorators

This archetype was made to do authentication with JWT token. To login, you only need to put username as admin and some password.

Actually, in your main class you should to inject all the `rest` that you will use and the NoAnTsConfiguration class. To run your application, in the main file you need to do something like:

        @Application
        export class Main {

            @Inject applicationContext: NoAnTsConfiguration;
            @Inject exampleRest: ExampleRest;

            constructor(private args: Array<string>) {
                this.applicationContext.run(args);
            }
        }

- @Application:
    This decorator will start the application using the default properties and configurations.

- @Inject:
    This decorator will inject the dependency in to the class property that is decorated;
- @Rest:
    This is a decorator to rest classes that will expose a endpoint to be accessed from another applicaiton;

- @Get and @Post:
    This will map the url path to be a endpoint so, if your application have a `localhost/api/getExample` as a endpoint so with this decorator will map this:

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

## Frontend - Interface

This project was generated with [Angular CLI
(https://github.com/angular/angular-cli) version 6.1.5.

- Code scaffolding

    Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Development server

- Backend: The library use ts-lint and nodemon to watch and rebuild when a file was changed, to watch the backend files(engine) you need to run:
    `npm run serve-engine`

- Frontend: The library use Angular as frontend so to watch and recompile when a file was changed you need to run:
    `npm run serve-engine`

## Build

To build frontend and backend you only need to run:
`npm run build`

- Backend: To build only the backend:
    `npm run build-engine`

- Frontend: To build only the frontend:
    `npm run build-interface`

## Running 

To run the backend and the frontend you need to run:

`npm run start`

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## LICENSE

MIT License

Copyright (c) 2018 Hanor Sátiro Cintra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
