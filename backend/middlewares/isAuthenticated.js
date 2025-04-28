import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token
  try {
    if (!token) {
      return res.status(401).json({ message: 'No token provided. Access denied.' })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode._id
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}

export default isAuthenticated
