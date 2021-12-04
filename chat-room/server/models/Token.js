const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  AccessToken: {
    type: String,
    required: true,
    trim: true,
  },
  RefreshToken: {
    type: String,
    required: true,
    trim: true,
  },
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
