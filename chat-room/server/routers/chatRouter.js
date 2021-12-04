const express = require('express');
const router = express.Router();
const { sendMessage, getAllMessages, getAllUsers } = require('../controller/chat.js');

// localhost:8080/chat

router.post('/send-message', sendMessage); //
router.get('/get-all', getAllMessages); //

router.get('/users', getAllUsers); //

module.exports = router;
