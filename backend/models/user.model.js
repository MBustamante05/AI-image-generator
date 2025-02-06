import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "name is required!"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;