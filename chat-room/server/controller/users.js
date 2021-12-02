const bcrypt = require('bcrypt');
const User = require('../models/User');

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
