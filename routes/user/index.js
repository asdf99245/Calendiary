const express = require('express');
const router = express.Router();
const controller = require('../../controllers/userController');

router.get('/auth/silent-refresh', controller.silentRefresh);
router.post('/auth/login', controller.login);
router.post('/auth/logout', controller.logout);
router.post('/auth/register', controller.register);

module.exports = router;
