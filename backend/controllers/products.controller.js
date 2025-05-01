import productModel from "../models/products.models.js";

export const createProduct = async (req, res) => {
  const createBy = req.user.id;
  const { name, description, price, brand } = req.body;

  try {
    if (!name || !description || !price || !brand || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields including product image are required",
      });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    const product = new productModel({
      name,
      description,
      price,
      productPicture: req.file.path,
      brand,
      createBy,
    });

    await product.save();
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, brand } = req.body;

  try {
    if (!name || !description || !price || !brand) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updateData = {
      name,
      description,
      price,
      brand,
    };

    if (req.file) {
      updateData.productPicture = req.file.path;
    }

    const product = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel
      .find()
      .populate("createBy", "firstName lastName profilePicture");
    res.status(200).json({
      success: true,
      count: allProducts.length,
      products: allProducts,
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAdminProducts = async (req, res) => {
  const adminId = req.user.id;

  try {
    const products = await productModel
      .find({ createBy: adminId })
      .populate("createBy", "firstName lastName profilePicture");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get Admin Products Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productModel.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
