import {IFileExtensionValidator} from "./file-extension-validator.interface";

export class DummyExtensionFileValidator implements IFileExtensionValidator{

    public hasCorrectFileExtension(filePath: string): boolean {
        return null;
    }

}