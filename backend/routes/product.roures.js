import express from "express";
import {
  createProduct,
  updateProduct,
  getAdminProducts,
  getAllProducts,
  deleteProduct,
} from "../controllers/products.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { uploadProductPicture } from "../configs/cloudinary.config.js";
const productRouter = express.Router();

productRouter.post(
  "/create-product",
  isAuthenticated,
  uploadProductPicture.single("productPicture"),
  createProduct
);

productRouter.put(
  "/update-product/:productId",
  isAuthenticated,
  uploadProductPicture.single("productPicture"),
  updateProduct
);

productRouter.get("/get-all-products", isAuthenticated, getAllProducts);

productRouter.get("/get-admin-products", isAuthenticated, getAdminProducts);

productRouter.delete(
  "/delete-product/:productId",
  isAuthenticated,
  deleteProduct
);

export default productRouter;
