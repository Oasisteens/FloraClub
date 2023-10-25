"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Table = require("cli-table");
const colors = require("colors/safe");
const config_1 = require("../config");
const basic_table_formatter_1 = require("./table-formatters/basic-table-formatter");
const type_script_file_crawler_factory_1 = require("./crawlers/type-script-file-crawler-factory");
const file_extension_validator_1 = require("./validators/file-extension-validator");
const file_system_crawler_1 = require("./crawlers/file-system-crawler");
const file_determiner_1 = require("./determiners/file-determiner");
const directory_crawler_1 = require("./crawlers/directory-crawler");
const crawlingPath = process.argv[2] || config_1.config.DEFAULT_PATH;
const includedFileExtensions = config_1.config.DEFAULT_FILE_INCLUDED_EXTENSIONS;
const excludedFileExtensions = config_1.config.DEFAULT_FILE_EXCLUDED_EXTENSIONS;
const tableFormatter = new basic_table_formatter_1.BasicTableFormatter(colors);
const fileCrawlerFactory = new type_script_file_crawler_factory_1.TypeScriptFileCrawlerFactory(Table, tableFormatter);
startJourney();
function startJourney() {
    const fileExtensionValidator = new file_extension_validator_1.FileExtensionValidator(includedFileExtensions, excludedFileExtensions);
    const fileSystemCrawler = new file_system_crawler_1.FileSystemCrawler(crawlingPath, fileCrawlerFactory, fileExtensionValidator, new file_determiner_1.FileDeterminer(), new directory_crawler_1.DirectoryCrawler());
    fileSystemCrawler.start();
}
//# sourceMappingURL=index.js.map