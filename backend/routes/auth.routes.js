import express from 'express';
import {
  login,
  register,
  logout,
  updateUser,
  getUser,
} from '../controllers/auth.controllers.js';
import authMiddleware from '../middlewares/auth.middewares.js';
import upload from './../config/multer.js';

const authRouter = express.Router();

authRouter.post('/register', upload.single('profile'), register);
authRouter.post('/login', login);
authRouter.get('/logout', authMiddleware, logout);
authRouter.get('/user', authMiddleware, getUser);
authRouter.put(
  '/update-user',
  authMiddleware,
  upload.single('profile'),
  updateUser,
);

export default authRouter;
