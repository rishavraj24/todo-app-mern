// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) {
      return res.status(401).json({ msg: 'No authentication token, authorization denied.' });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ msg: 'Token verification failed, authorization denied.' });
    }

    // Attach user id from the token's payload to the request object
    req.user = verified.id;
    next(); // Move on to the next piece of middleware or the route handler

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;