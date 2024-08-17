// backend/utils/authUtils.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config'); // Assume you have a config file for secret keys, etc.

// Generate JWT Token
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role, // Assuming you have user roles like 'user', 'admin', etc.
  };
  
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

// Verify JWT Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null; // If token is invalid or expired
  }
};

// Hash Password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare Password
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided.' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  req.user = decoded; // Attach user information to the request object
  next();
};

// Middleware for role-based access control
const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access Denied: You do not have the required role.' });
  }
  next();
};

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  authMiddleware,
  roleMiddleware,
};
