const multer = require('multer');

let fileCount = 0; // Initialize a variable to keep track of the file count

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    const filename = 'biphflora-' + req.body.featuredColumnTitle + '-' + req.user.username + '-' + Date.now() + '.' + fileExtension; // Generate a unique filename
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage
}).array('files', 10); // Process up to 10 files with the field name 'files'

const getFileCount = function () {
  return fileCount; // Return the file count
};

const middleware = function(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during file upload
      return res.status(500).json({ message: 'File upload error' });
    } else if (err) {
      // An unknown error occurred during file upload
      return res.status(500).json({ message: 'Unknown error occurred' });
    }

    // Increment the file count by the number of uploaded files
    fileCount += req.files.length;
    next();
  });
};

module.exports = {
  middleware,
  getFileCount
};