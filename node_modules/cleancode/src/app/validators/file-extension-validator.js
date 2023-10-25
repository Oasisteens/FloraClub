"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileExtensionValidator {
    constructor(includedFileExtensions, excludedFileExtensions) {
        this.includedFileExtensions = includedFileExtensions;
        this.excludedFileExtensions = excludedFileExtensions;
    }
    hasCorrectFileExtension(filePath) {
        return !this.satisfiesFileExtension(filePath, this.excludedFileExtensions)
            && this.satisfiesFileExtension(filePath, this.includedFileExtensions);
    }
    satisfiesFileExtension(filePath, fileExtensions) {
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
exports.FileExtensionValidator = FileExtensionValidator;
//# sourceMappingURL=file-extension-validator.js.map