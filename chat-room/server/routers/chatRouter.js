const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controller/chat.js');

// localhost:8080/chat

router.post('/send-message', sendMessage); //

module.exports = router;
