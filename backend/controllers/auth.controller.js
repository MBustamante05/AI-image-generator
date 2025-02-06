import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../config.js";

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingEmail = await User.findOne({email: {$regex: `^${email}$`, $options: "i"}});
    if (existingEmail) {
      return res.status(400).json({message: "Email already exists"});
    }

    if (password.length < 6) {
      return res.status(400).json({message: "Password must be at least 6 characters"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({email, name, password: hashedPassword});
    await user.save();

    return res.status(200).json({ message: "Signup successful" });

  } catch (error) {
    console.error("Error in signup", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: {$regex: `^${email}$`, $options: "i"} });

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({message: "Invalid password"});
    }

    const token = jwt.sign({userId: user._id}, JWT_KEY, {expiresIn: "3d"});

    res.cookie("ai-token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    return res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("Error in login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getUser = async (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
}