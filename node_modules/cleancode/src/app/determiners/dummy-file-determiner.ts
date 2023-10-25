import {IFileDeterminer} from "./file-determiner.interface";

export class DummyFileDeterminer implements IFileDeterminer {

    isDirectory(filePath: string): Promise<boolean> {
        return null;
    }

    isFile(filePath: string): Promise<boolean> {
        return null;
    }

}