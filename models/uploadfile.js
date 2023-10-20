const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const now = new Date();
    const utc8Offset = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    const utc8Now = new Date(now.getTime() + utc8Offset);

    cb(null, 'biphflora-' + req.body.featuredColumnTitle + '-' + req.user.username );
}
});
const upload = multer({ storage: storage });
module.exports = upload;