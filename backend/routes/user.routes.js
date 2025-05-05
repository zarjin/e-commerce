import express from 'express';
import {
  updateUser,
  deleteUser,
  getUser,
  previewUser,
  addCart,
  removeCart,
  isAdmin,
  getCart,
  makeAdmin,
  createFirstAdmin,
} from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { uploadProfilePicture } from '../configs/cloudinary.config.js';

const userRouter = express.Router();

userRouter.put(
  '/update-user',
  isAuthenticated,
  uploadProfilePicture.single('profilePicture'),
  updateUser
);
userRouter.delete('/delete-user', isAuthenticated, deleteUser);
userRouter.get('/get-user', isAuthenticated, getUser);
userRouter.get('/preview-user/:id', previewUser);
userRouter.put('/add-cart/:productId', isAuthenticated, addCart);
userRouter.post('/remove-cart/:productId', isAuthenticated, removeCart);
userRouter.post('/isAdmin', isAuthenticated, isAdmin);
userRouter.get('/getCart', isAuthenticated, getCart);
userRouter.post('/make-admin', isAuthenticated, makeAdmin);
userRouter.post('/create-first-admin', createFirstAdmin);

export default userRouter;
