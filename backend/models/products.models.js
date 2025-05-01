import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 2000,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },

  productPicture: {
    type: String,
  },
  brand: {
    type: String,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
