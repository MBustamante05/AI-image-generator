import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../config.js";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies["ai-token"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    const decode = jwt.verify(token, JWT_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectedRoute middleware", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}