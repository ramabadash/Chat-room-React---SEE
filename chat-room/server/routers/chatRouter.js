const express = require('express');
const router = express.Router();
const { sendMessage, getAllMessages, getAllUsers } = require('../controller/chat.js');
const { authAccessToken } = require('../Middlewares/authMiddlewares.js');

// localhost:8080/chat

router.post('/send-message', authAccessToken, sendMessage); // Save message to DB and send to all
router.get('/get-all', authAccessToken, getAllMessages); // Get all messages ans open stream connection for messages

router.get('/users', authAccessToken, getAllUsers); // Get all users onLine ans open stream connection for users

module.exports = router;
