import { System } from './core/system';

export class Main {
    private system: System;
    constructor(private args: Array<string>) {
        this.start();
    }
    start() {
        this.system = new System(this.args);
    }
}

const main: Main = new Main(process.argv);