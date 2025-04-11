import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
)

const cartModels = mongoose.model('Cart', cartSchema)
export default cartModels
