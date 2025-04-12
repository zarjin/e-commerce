import jwt from 'jsonwebtoken';
import userModels from '../models/user.models.js';

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModels.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
