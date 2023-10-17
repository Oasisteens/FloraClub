const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/db");

const uri = require('mongodb-uri');
const connectionString = uri.format({
  scheme: 'mongodb',
  hosts: [{ host: dbConfig.url }],
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Any additional connection options
  },
  database: dbConfig.database
});

var storage = new GridFsStorage({
  url: connectionString,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-biphflora-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: dbConfig.imgBucket,
      filename: `${Date.now()}-biphflora-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;