const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const authToken = authHeader.split(' ')[1];

    jwt.verify(authToken, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(401).json({ msg: 'Invalid authorization Bearer token!' });
      }

      req.userId = data.userId;
      next();
    });
  } else {
    return res.status(401).json({ msg: 'Authorization Bearer token missing!' });
  }
}

module.exports = checkAuth;
