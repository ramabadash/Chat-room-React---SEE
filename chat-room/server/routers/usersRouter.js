const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controller/users.js');
const { validateRegisterDetails } = require('../Middlewares/validator.js');

// localhost:8080/users

router.post('/register', validateRegisterDetails, register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
