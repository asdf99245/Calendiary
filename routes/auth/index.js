const express = require('express');
const router = express.Router();
const controller = require('../../controllers/auth.controller');

router.get('/silent-refresh', controller.silentRefresh);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/register', controller.register);

module.exports = router;
