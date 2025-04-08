import express from "express";
import {
  login,
  register,
  logout,
  updateUser,
  getUser,
  checkAuth,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middewares.js";
import upload from "./../config/multer.js";

const authRouter = express.Router();

authRouter.post("/register", upload.single("profile"), register);
authRouter.post("/login", login);
authRouter.get("/logout", authMiddleware, logout);
authRouter.get("/user", authMiddleware, getUser);
authRouter.put(
  "/update-user",
  authMiddleware,
  upload.single("profile"),
  updateUser
);

authRouter.get("/check-auth", authMiddleware, checkAuth);

export default authRouter;
