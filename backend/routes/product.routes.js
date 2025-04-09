import express from "express";
import {
  createProduct,
  getAllmyCreateProducts,
  deleteProducts,
  getAllProducts,
  editProducts,
} from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middewares.js";
import uplaod from "../config/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/create",
  uplaod.single("productimages"),
  authMiddleware,
  createProduct
);

productRouter.get("/user-products", authMiddleware, getAllmyCreateProducts);
productRouter.delete("/delete/:id", authMiddleware, deleteProducts);
productRouter.get("/getall-products", authMiddleware, getAllProducts);
productRouter.put("/edit", authMiddleware, editProducts);

export default productRouter;
