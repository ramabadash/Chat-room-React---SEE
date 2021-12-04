const Message = require('../models/Message');
const Token = require('../models/Token');

let clients = [];

/***** FUNCTIONS ******/

/***** MESSAGES ******/
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
    const { userName } = req.query;

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

    req.on('close', () => {
      console.log(`${userName} close messages connection`);
    });
  } catch (error) {
    next(error);
  }
};

// Triggered by post request to write message to every one
function sendToAll(message) {
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(message)}\n\n`));
}

/***** USERS ******/
// Get All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const { userName } = req.query;
    // Get all connected users from tokens data
    const usersList = await Token.find({});
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',

      // enabling CORS
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    });
    res.write(`data: ${JSON.stringify(usersList)}\n\n`);

    // When client closes connection we update the clients list
    // avoiding the disconnected one
    req.on('close', () => {
      console.log(`${userName} close users connection`);
      res.write(`data: ${JSON.stringify(usersList)}\n\n`); //Update onLine users
      clients = clients.filter((client) => client.userName !== userName);
      sendToAll(`${userName} left the chat...`);
    });

    return sendToAll(`${userName} joined the chat!`); // Send message about user login to all
  } catch (error) {
    next(error);
  }
};
