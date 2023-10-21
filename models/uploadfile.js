const multer = require('multer');

let fileNumber = 0; // Initialize a variable to keep track of the file number

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    fileNumber += 1; // Increment the file number for each uploaded file
    const filename = 'biphflora-' + req.body.featuredColumnTitle + '-' + req.user.username + '-' + fileNumber + '.png'; // Use the file number in the filename
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage
});

module.exports = {
  upload: upload,
  getFileNumber: function () {
    return fileNumber; // Return the file number
  }
};