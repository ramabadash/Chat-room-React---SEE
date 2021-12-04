const jwt = require('jsonwebtoken');

// Valid access token before continue
exports.authAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.accesstoken;

    if (!token) throw { status: 403, message: 'Must provide token' };

    const { userId, userName } = await jwt.verify(token, process.env.ACCESS_SECRET);

    if (!userId || !userName) throw { status: 403, message: 'Invalid token' };
    else next();
  } catch (error) {
    next(error);
  }
};
