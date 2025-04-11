import express from 'express'
import uplaod from '../config/multer.js'
import {
  createProduct,
  deleteProducts,
  editProducts,
  getAllmyCreateProducts,
  getAllProducts,
  getProductById,
} from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middewares.js'

const productRouter = express.Router()

productRouter.post('/create', uplaod.single('productimages'), authMiddleware, createProduct)

productRouter.get('/user-products', authMiddleware, getAllmyCreateProducts)
productRouter.delete('/delete/:id', authMiddleware, deleteProducts)
productRouter.get('/getall-products', authMiddleware, getAllProducts)
productRouter.get('/product/:id', authMiddleware, getProductById)
productRouter.put('/edit/:id', uplaod.single('productimages'), authMiddleware, editProducts)

export default productRouter
