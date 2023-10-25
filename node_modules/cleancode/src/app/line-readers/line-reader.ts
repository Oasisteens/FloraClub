import {ILineReader} from "./line-reader.interface";
import * as fs from "fs";

export class LineReader implements ILineReader {

    private lineReader: ILineReader = null;

    constructor(private path: string) {
    }

    public addListener(event, cb: (line?: string) => void) {
        this.lazyInitialize();
        return this.lineReader.addListener(event, cb);
    }

    private lazyInitialize() {
        if( ! this.lineReader) {
            this.lineReader = require('readline').createInterface({
                input: fs.createReadStream(this.path)
            });
        }
    }

}