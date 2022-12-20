const express = require('express');
const router = express.Router();
const diary = require('./diary');
const auth = require('./auth');

router.use('/auth', auth);
router.use('/diary', diary);

module.exports = router;
