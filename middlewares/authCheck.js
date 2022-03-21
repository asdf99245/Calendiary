const { verifyToken } = require('../utils/jwt');

exports.authCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];
    const decoded = verifyToken(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      req.decoded = decoded;
      next();
    } else {
      res.status(401).send('unauthorized');
    }
  } catch (err) {
    res.status(401).send('token expired');
  }
};
