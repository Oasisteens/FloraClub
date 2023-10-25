"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class LineReader {
    constructor(path) {
        this.path = path;
        this.lineReader = null;
    }
    addListener(event, cb) {
        this.lazyInitialize();
        return this.lineReader.addListener(event, cb);
    }
    lazyInitialize() {
        if (!this.lineReader) {
            this.lineReader = require('readline').createInterface({
                input: fs.createReadStream(this.path)
            });
        }
    }
}
exports.LineReader = LineReader;
//# sourceMappingURL=line-reader.js.map