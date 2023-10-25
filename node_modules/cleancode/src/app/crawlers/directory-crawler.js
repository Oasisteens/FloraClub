"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recursive = require("recursive-readdir");
class DirectoryCrawler {
    recursive(path) {
        return new Promise((resolve, reject) => {
            recursive(path, (err, files) => {
                if (err) {
                    return reject(err);
                }
                return resolve(files);
            });
        });
    }
}
exports.DirectoryCrawler = DirectoryCrawler;
//# sourceMappingURL=directory-crawler.js.map