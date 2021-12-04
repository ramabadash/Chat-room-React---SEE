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

/***** STREAM ******/
// Create stream connection and send all data
exports.getAllData = async (req, res, next) => {
  try {
    const { userName } = req.query;

    console.log(`${userName} open connection`);

    const usersList = await Token.find({}); // Get all connected users from tokens data
    const messageList = await Message.find({}); // Get all messages from messages data
    const data = { usersList, messageList };

    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',

      // enabling CORS
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    });
    res.write(`data: ${JSON.stringify(data)}\n\n`);

    // When client closes connection we update the clients list
    // avoiding the disconnected one
    req.on('close', () => {
      res.write(`data: ${JSON.stringify(data)}\n\n`); //Update onLine users
      clients = clients.filter((client) => client.userName !== userName); //remove user from res array
      sendToAll(`${userName} left the chat...`); //send message "user left chat.."

      console.log(`${userName} close connection`);
    });

    return sendToAll(`${userName} joined the chat!`); // Send message about user login to all
  } catch (error) {
    next(error);
  }
};
// Triggered by post request to write message to every one
function sendToAll(message) {
  console.log(message);
  clients.forEach((c) => c.res.write(`data: ${{ messageList: JSON.stringify(message) }}\n\n`));
}
