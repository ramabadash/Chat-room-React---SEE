const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/users.js');

// localhost:8080/users

router.post('/register', register);
router.post('/login', login);

module.exports = router;
