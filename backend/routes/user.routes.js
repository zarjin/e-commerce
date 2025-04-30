import express from "express";
import {
  addCart,
  updateUser,
  getUser,
  isAdmin,
  removeCart,
  previewUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const userRouter = express.Router();

// Route to get user details
userRouter.get("/user/:id", isAuthenticated, getUser);
// Route to update user details
userRouter.put("/user/:id", isAuthenticated, updateUser);
// Route to add item to cart
userRouter.put("/user/cart/:id", isAuthenticated, addCart);
// Route to remove item from cart
userRouter.put("/user/cart/remove/:id", isAuthenticated, removeCart);
// Route to preview user details (admin only)
userRouter.get("/user/preview/:id", isAuthenticated, isAdmin, previewUser);
// Route to check if user is admin
userRouter.get("/user/isAdmin/:id", isAuthenticated, isAdmin);

export default userRouter;
