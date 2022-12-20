const express = require('express');
const router = express.Router();
const controller = require('../../controllers/diary.controller');
const { authCheck } = require('../../middlewares/authCheck');
const upload = require('../../middlewares/multerUpload');

router.use(authCheck);
router.get('/', controller.getDiaries);
router.post('/', upload.single('file'), controller.writeDiary);
router.delete('/:id', controller.deleteDiary);
router.post('/:id', upload.single('file'), controller.updateDiary);

module.exports = router;
