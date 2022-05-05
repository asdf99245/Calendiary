const express = require('express');
const router = express.Router();
const controller = require('../../controllers/diaryController');
const { authCheck } = require('../../middlewares/authCheck');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${req.decoded.id}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.use(authCheck);
router.get('/diaries', controller.diaries);
router.post('/diary', upload.single('file'), controller.diary);
router.delete('/diary/:id', controller.delete);

module.exports = router;
