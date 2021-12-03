const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token.js');

/***** FUNCTIONS ******/
// Register by -userName, email and password
exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const exists = await User.find({ $or: [{ email }, { userName }] });

    if (exists.length > 0) {
      throw { status: 400, message: 'UserName or email already exists' };
    }

    await User.create({
      userName,
      email,
      password: await bcrypt.hash(password, await bcrypt.genSalt(8)),
    });

    res.send('Registered');
  } catch (err) {
    next(err);
  }
};

// Login by userName and password - create token + refresh token, save to DB and send back
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) throw { status: 400, message: 'No such username' };
    if (!bcrypt.compare(password, user.password)) throw { status: 400, message: 'Bad password' };

    const userId = user._id;

    const accessToken = jwt.sign({ username, userId }, process.env.ACCESS_SECRET, {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign({ userId, username }, process.env.REFRESH_SECRET, {
      expiresIn: '24h',
    });

    const tokenUser = await Token.findOne({ userId });
    if (tokenUser) {
      await Token.findOneAndUpdate({ userId }, { $set: { AccessToken: accessToken, RefreshToken: refreshToken } });
    } else {
      Token.create({ userId, AccessToken: accessToken, RefreshToken: refreshToken });
    }

    res.send({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};
