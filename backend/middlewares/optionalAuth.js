import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../config.js";
import User from "../models/user.model.js";

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies["ai-token"];

    if (token) {
      const decode = jwt.verify(token, JWT_KEY);
      if (decode) {
        const user = await User.findById(decode.userId).select("-password");
        if (user) {
          req.user = user;
        }
      }
    }
  } catch (error) {
    console.error("Error in optionalAuth middleware", error);
  }
  next();
};
