const express = require('express');
const router = express.Router();
const calendar = require('./calendar');
const auth = require('./auth');

router.use('/auth', auth);
router.use('/calendar', calendar);

module.exports = router;
