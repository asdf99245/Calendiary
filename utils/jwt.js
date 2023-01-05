const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('./error');

module.exports = {
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return decoded;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Token Expired');
      }
      throw err;
    }
  },
  makeAccessToken: (id) => {
    try {
      return jwt.sign(
        {
          id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '30s',
        }
      );
    } catch (err) {
      throw err;
    }
  },
  makeRefreshToken: (id) => {
    try {
      return jwt.sign(
        {
          id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '14d',
        }
      );
    } catch (err) {
      throw err;
    }
  },
};
