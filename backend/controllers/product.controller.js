import productsModels from '../models/product.models.js'

export const createProduct = async (req, res) => {
  const { name, description, price, category, brand, stock } = req.body

  if (!name || !price || !category || !stock) {
    return res.status(400).json({ message: 'Required fields are missing.' })
  }

  try {
    const product = await productsModels.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      productimages: {
        url: req.file?.path || '',
      },
      createdBy: req.user?.id,
    })

    res.status(201).json({
      message: '✅ Product created successfully',
      product,
    })
  } catch (error) {
    console.error('❌ Product Create Error:', error)
    res.status(500).json({
      message: 'Internal Server Error while creating product',
      error: error.message,
    })
  }
}
export const getAllmyCreateProducts = async (req, res) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized access.' })
    }

    const products = await productsModels.find({ createdBy: userId })

    res.status(200).json({
      message: '📦 Products fetched successfully',
      total: products.length,
      products,
    })
  } catch (error) {
    console.error('❌ Fetch Error:', error)
    res.status(500).json({
      message: 'Internal Server Error while fetching your products',
      error: error.message,
    })
  }
}
export const deleteProducts = async (req, res) => {
  const { id } = req.params

  try {
    const deletedProduct = await productsModels.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({
      message: 'Product deleted successfully',
    })
  } catch (error) {
    console.error('Delete Product Error:', error)
    res.status(500).json({ message: 'Server error while deleting product' })
  }
}
export const getAllProducts = async (req, res) => {
  try {
    const allProduct = await productsModels.find()

    if (!allProduct) {
      return res.status(400).json({ message: 'All Products Not Founds' })
    }

    res.status(200).json(allProduct)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something Wong' })
  }
}

export const getProductById = async (req, res) => {
  const { id } = req.params

  try {
    const product = await productsModels.findById(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    console.error('Get Product Error:', error)
    res.status(500).json({ message: 'Server error while fetching product' })
  }
}
export const editProducts = async (req, res) => {
  const { id } = req.params

  const { name, description, price, category, brand, stock } = req.body

  if (!name || !price || !category || !stock) {
    return res.status(400).json({ message: 'Required fields are missing.' })
  }

  try {
    const product = await productsModels.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        brand,
        stock,
        productimages: {
          url: req.file?.path || '',
        },
        createdBy: req.user?.id,
      },
      { new: true }
    )

    res.status(201).json({
      message: '✅ Product Edits successfully',
      product,
    })
  } catch (error) {
    console.error('❌ Product Edits Error:', error)
    res.status(500).json({
      message: 'Internal Server Error while Editing product',
      error: error.message,
    })
  }
}
