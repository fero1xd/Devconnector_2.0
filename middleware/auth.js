const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = async function (req, res, next) {
  // Get the Token from the header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  // Verify Token
  try {
    const { userId } = jwt.verify(token, process.env.jwtSecret);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
