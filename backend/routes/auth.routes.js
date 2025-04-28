import express from 'express'
import { register, login, logout, checkAuth } from '../controllers/auth.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/logout', logout)
authRouter.get('/check-auth', isAuthenticated, checkAuth)
export default authRouter
