const express = require('express');
const router = express.Router();
const controller = require('../../controllers/diary.controller');
const { authCheck } = require('../../middlewares/authCheck');
const upload = require('../../middlewares/multerUpload');

router.use(authCheck);
router.get('/diaries', controller.diaries);
router.post('/diary', upload.single('file'), controller.diary);
router.delete('/diary/:id', controller.delete);
router.post('/diary/:id', upload.single('file'), controller.update);

module.exports = router;
