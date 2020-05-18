import * as fs from 'fs-extra';
import { Console } from 'console';
import { WriteStream } from 'fs';

export class Logger {

    private static instance: Logger;
    private console;
    private output: WriteStream;

    static getInstance() {
        if (!this.instance) {
            this.instance = new Logger();
        }
        return this.instance;
    }

    setOutputFile(fileName: string) {
   
        if (this.output) {
            this.output.close();
        }
        const file = `./e2e/_logs/${fileName}.log`;
        fs.ensureFileSync(file);
        this.output = fs.createWriteStream(file);
        this.console = new Console(this.output);
    }

    log(message: string) {
        this.console.log(message);
    }

    assert(test?: boolean, message?: string, ...optionalParams: any[]) {
        return this.console.assert(test, message, ...optionalParams);
    }
}
