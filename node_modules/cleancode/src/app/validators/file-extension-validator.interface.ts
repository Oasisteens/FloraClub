export interface IFileExtensionValidator {
    hasCorrectFileExtension(filePath: string): boolean;
}