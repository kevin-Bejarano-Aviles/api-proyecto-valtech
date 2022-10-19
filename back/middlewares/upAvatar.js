// Require multer
const multer = require('multer');
// Require path
const path = require('path');

const storage = multer.diskStorage({ // To save img
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'front', 'src', 'assets', 'students')); // img destination from edit form
  }, /*  */
  filename(req, file, cb) {
    // We name the img with the date, and a random number so will never repeat
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

module.exports = { upload };
