const express = require('express');
const router = express.Router();
const controller = require('../../controllers/diaryController');
const { authCheck } = require('../../middlewares/authCheck');

router.use(authCheck);
router.get('/diaries', controller.diaries);
router.post('/diary', controller.diary);

module.exports = router;
