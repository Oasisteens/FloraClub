import {IDirectoryCrawler} from "./directory-crawler.interface";
import * as recursive from 'recursive-readdir';

export class DirectoryCrawler implements IDirectoryCrawler {

    recursive(path: string): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            recursive(path, (err, files: Array<string>) => {
                if (err) {
                    return reject(err);
                }

                return resolve(files);
            });
        });
    }

}