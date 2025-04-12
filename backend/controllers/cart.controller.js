import cartModels from '../models/cart.models.js'
export const addCart = async (req, res) => {
  const { products } = req.body
  try {
    // Use the authenticated user's ID from the request object
    const userId = req.user.id

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

    // Fetch carts and populate product details in a single query
    const carts = await cartModels.find({ userId }).populate('products.productId') // Ensure correct field name matches schema

    res.status(200).json(carts)
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ message: 'Get Cart Error' })
  }
}

export const removeFromCart = async (req, res) => {
  const { cartId, productId } = req.params

  try {
    const cart = await cartModels.findById(cartId)

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    cart.products = cart.products.filter((item) => item.productId.toString() !== productId)
    await cart.save()
    res.status(200).json({ message: 'Product removed from cart' })
  } catch (error) {
    console.error('Error removing product from cart:', error)
    res.status(500).json({ message: 'Remove Product Error' })
  }
}
