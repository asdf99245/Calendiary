const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../utils/s3');

const storage =
  process.env.NODE_ENV === 'development'
    ? multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}_${req.decoded.id}_${file.originalname}`);
        },
      })
    : multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
          cb(null, `${Date.now()}_${req.decoded.id}_${file.originalname}`);
        },
      });

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;
