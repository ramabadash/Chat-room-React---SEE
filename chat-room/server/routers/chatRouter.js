const express = require('express');
const router = express.Router();
const { sendMessage, getAllMessages, getAllUsers, getAllData } = require('../controller/chat.js');
const { authAccessToken } = require('../Middlewares/authMiddlewares.js');

// localhost:8080/chat

router.post('/send-message', authAccessToken, sendMessage); // Save message to DB and send to all

router.get('/stream', getAllData); // Get all messages and users +  open stream connection

module.exports = router;
