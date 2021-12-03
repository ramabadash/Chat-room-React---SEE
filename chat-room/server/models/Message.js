const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  timeStamp: {
    type: String,
    required: true,
    trim: true,
  },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
