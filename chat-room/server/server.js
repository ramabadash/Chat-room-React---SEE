/***** REQUIRE *****/
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

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

app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));
