const express = require('express');
const router = express.Router();
const calendar = require('./calendar');
const user = require('./user');

router.use('/calendar', calendar);
router.use('/user', user);

module.exports = router;
