import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided. Access denied." });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default isAuthenticated;
