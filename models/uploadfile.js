const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-biphflora-' + file.originalname); // Set a unique filename for the uploaded file
  }
});
const upload = multer({ storage: storage });
module.exports = upload;