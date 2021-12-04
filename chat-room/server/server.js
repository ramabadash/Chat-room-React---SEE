/***** REQUIRE *****/
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

const usersRouter = require('./routers/usersRouter.js');
const chatRouter = require('./routers/chatRouter.js');
const { errorHandlerMiddleware } = require('./Middlewares/errorHandler.js');

/***** DB *****/
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`connected to MongoDB`);
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

/***** MIDDLEWARE *****/
app.use(express.json());
app.use(cors());

/***** ROUTERS *****/
app.use('/users', usersRouter); // Register, Login, Logout
app.use('/chat', chatRouter); // Send Message

app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));
