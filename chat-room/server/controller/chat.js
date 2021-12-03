const Message = require('../models/Message');
const clients = [];

// Save message to DB
exports.sendMessage = async (req, res, next) => {
  const { userName, content, timeStamp } = req.body;
  try {
    const message = await Message.create({
      userName,
      content,
      timeStamp,
    });

    res.status(200).send('Message Sent');
    return sendToAll(message);
  } catch (error) {
    next(error);
  }
};

// Get All Messages
exports.getAllMessages = async (req, res, next) => {
  try {
    const { userName } = req.params;

    const messageList = await Message.find({});
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',

      // enabling CORS
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    });
    res.write(`data: ${JSON.stringify(messageList)}\n\n`);

    // Save response to be answered
    const newClient = {
      userName,
      res,
    };
    clients.push(newClient);
  } catch (error) {
    next(error);
  }
};

// Triggered by post request to write message to every one
function sendToAll(message) {
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(message)}\n\n`));
}
