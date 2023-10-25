import {IFileDeterminer} from "./file-determiner.interface";
import * as fs from "fs";

export class FileDeterminer implements IFileDeterminer {

    public async isDirectory(filePath: string): Promise<boolean> {
        const result = await this.lsStatPromisified(filePath);
        return result.isDirectory();
    }

    public async isFile(filePath: string): Promise<boolean> {
        const result = await this.lsStatPromisified(filePath);
        return result.isFile();
    }

    private lsStatPromisified(path): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.lstat(path, (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
        });
    }

}