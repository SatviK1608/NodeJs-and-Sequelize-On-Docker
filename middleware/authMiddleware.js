const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader,"hii")
    if (bearerHeader == undefined) {
      return res.status(401).json({ message: 'Access Denied' });

    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;