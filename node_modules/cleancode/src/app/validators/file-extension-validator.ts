
import {ExcludedFileExtensions, IncludedFileExtensions} from "../../config";

export class FileExtensionValidator {

    constructor(private includedFileExtensions: IncludedFileExtensions,
                private excludedFileExtensions: ExcludedFileExtensions) {

    }

    public hasCorrectFileExtension(filePath) {
        return ! this.satisfiesFileExtension(filePath, this.excludedFileExtensions)
            && this.satisfiesFileExtension(filePath, this.includedFileExtensions);
    }

    private satisfiesFileExtension(filePath, fileExtensions) {
        let isValid = false;

        fileExtensions.forEach((item) => {
            const regex = new RegExp(`.+\.${item}$`, 'g');
            const result = regex.exec(filePath);

            if (result) {
                return isValid = true;
            }
        });

        return isValid;
    }
}