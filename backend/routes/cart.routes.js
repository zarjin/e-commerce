import express from 'express'
import { addCart, getAllCart, removeFromCart } from '../controllers/cart.controller.js'
import authMiddleware from '../middlewares/auth.middlewares.js'
const cartRouter = express.Router()

cartRouter.post('/add', authMiddleware, addCart)
cartRouter.get('/get-cart', authMiddleware, getAllCart)
cartRouter.delete('/remove-item/:cartId/:productId', authMiddleware, removeFromCart)

export default cartRouter
