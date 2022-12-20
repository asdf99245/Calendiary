const { verifyToken } = require('../utils/jwt');
const { UnauthorizedError } = require('../utils/error');

exports.authCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];
    const decoded = verifyToken(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      req.decoded = decoded;
      next();
    } else {
      throw new UnauthorizedError('Invalid Token');
    }
  } catch (err) {
    next(err);
  }
};
