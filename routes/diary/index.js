const express = require('express');
const router = express.Router();
const controller = require('../../controllers/diary.controller');
const { authCheck } = require('../../middlewares/authCheck');
const upload = require('../../middlewares/multerUpload');

router.use(authCheck);
router.get('/', controller.getDiaries);
router.post('/', upload.array('files'), controller.writeDiary);
router.delete('/:id', controller.deleteDiary);
router.post('/:id', upload.array('files'), controller.updateDiary);

module.exports = router;
