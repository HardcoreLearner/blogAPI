const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const authController = require('../controller/authController');

router.post('/register', authController.register);
router.post('/login', passport.authenticate('local', { session: false }), authController.login);

module.exports = router;
