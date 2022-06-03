const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return decoded;
    } catch (err) {
      console.log(err);
      return false;
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
          expiresIn: '1h',
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
