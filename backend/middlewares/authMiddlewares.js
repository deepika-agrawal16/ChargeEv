import pkg from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = pkg.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'User not found, authorization denied' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Not authorized, token failed',
        error: error.message,
      });
    }
  } else {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
};

export default protect;
