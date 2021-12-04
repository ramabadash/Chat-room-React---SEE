const User = require('../models/User');

//Validate user details
exports.validateRegisterDetails = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const exists = await User.find({ $or: [{ email }, { userName }] });

    if (exists.length > 0) {
      throw { status: 400, message: 'UserName or email already exists' };
    } else if (!validateEmail(email)) {
      throw { status: 400, message: 'Invalid Email' };
    } else if (!validateUserName(userName)) {
      throw { status: 400, message: 'Not A valid userName' };
    } else if (!validatePassword(password)) {
      throw { status: 400, message: 'Not A strong password' };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

//Validate Email
function validateEmail(emailAdress) {
  const regexEmail = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/); //Regex: valid email
  return emailAdress.match(regexEmail);
}

//Validate userName
function validateUserName(username) {
  const usernameRegex = RegExp(/^[a-zA-Z0-9]+$/); //Regex: At least 1 UperCase letter  + 1 lowerCase letter + Number
  return usernameRegex.test(username);
}

//Validate paswword
function validatePassword(password) {
  let pattern = new RegExp('^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$'); //Regex: At least 8 characters with at least 2 numericals
  return pattern.test(password);
}
