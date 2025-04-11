// Assuming you have a Mongoose model in a file: models/Cart.js
import cartModels from '../models/cart.models.js'

export const addCart = async (req, res) => {
  const { userId, products } = req.body
  try {
    const cart = new cartModels({ userId, products })
    await cart.save()
    res.status(200).json(cart)
  } catch (error) {
    console.error('Error adding cart:', error)
    res.status(500).json({ message: 'Add Cart Error' })
  }
}

export const getAllCart = async (req, res) => {
  try {
    const userId = req.user.id

    const cart = await cartModels.find({ userId })

    res.status(200).json(cart)
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ message: 'Get Cart Error' })
  }
}
