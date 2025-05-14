const jwt = require('../utils/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verifyToken(token);
    req.user = user;
    next();
  } catch {
    res.sendStatus(403);
  }
};
