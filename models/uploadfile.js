const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, 'biphflora-' + req.body.featuredColumnTitle + '-' + req.user.username + '.png' );
}
});
const upload = multer({ storage: storage });
module.exports = upload;



