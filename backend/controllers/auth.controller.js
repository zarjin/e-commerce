import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.models.js'

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(500).json({ message: 'required all field' })
    }

    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
      return res.status(500).json({ message: 'User is already existing' })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    if (!hashPassword) {
      return res.status(500).json({ message: 'Password is not hashPassword' })
    }

    const newUser = await userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    })

    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)

    if (!token) {
      return res.status(500).json({ message: 'Token is not Generate' })
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ message: 'Register Successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `Register Error:${error}` })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(500).json({ message: 'required all field' })
    }

    const existingUser = await userModel.findOne({ email }).select('+password')

    if (!existingUser) {
      return res.status(500).json({ message: 'user is not existing' })
    }

    const Compare = await bcrypt.compare(password, existingUser.password)

    if (!Compare) {
      return res.status(500).json({ message: 'Password is not Compare' })
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET)

    if (!token) {
      return res.status(500).json({ message: 'Token is not Generate' })
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ message: 'Login Successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `Logout Error:${error}` })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })
    return res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Logout Error:', error)
    return res.status(500).json({ message: `Logout Error: ${error.message}` })
  }
}

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ authentication: true })
  } catch (error) {
    console.error('Authentication check failed:', error)
    res.status(500).json({ authentication: false, error: 'Internal Server Error' })
  }
}
