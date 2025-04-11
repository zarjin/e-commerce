import express from 'express'
import { addCart, getAllCart } from '../controllers/cart.controller.js'
import authMiddleware from '../middlewares/auth.middewares.js'
const cartRouter = express.Router()

cartRouter.post('/add', authMiddleware, addCart)
cartRouter.get('/get-cart', authMiddleware, getAllCart)

export default cartRouter
