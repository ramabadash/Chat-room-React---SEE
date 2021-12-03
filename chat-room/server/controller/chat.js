const Message = require('../models/Message');

// Save message to DB
exports.sendMessage = async (req, res, next) => {
  const { userName, content, timeStamp } = req.body;
  try {
    await Message.create({
      userName,
      content,
      timeStamp,
    });

    res.status(200).send('Message Sent');
  } catch (error) {
    next(error);
  }
};

