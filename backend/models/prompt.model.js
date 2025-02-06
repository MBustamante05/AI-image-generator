import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required!"],
    },
    imagesUrl: {
      type: [
        {
          id: Number,
          url: String,
          photographer: String
        }
      ],
    }
  },
  {
    timestamps: true,
  }
);

const Prompt = mongoose.model("Prompt", promptSchema);

export default Prompt;