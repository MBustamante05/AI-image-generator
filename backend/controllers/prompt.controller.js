import Prompt from "../models/prompt.model.js";

export const create = async (req, res) => {
  try {
    const { prompt } = req.body;
    const images = await main(prompt);

    const user = req.user;
    if (user){
      const newPrompt = await Prompt({
        userId: user._id,
        prompt,
        imagesUrl: images,
      });

      await newPrompt.save();
    }

    return res.status(200).json(images);
  } catch (error) {
    console.error("Error in creating prompt", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//Solo para usuarios autenticados
export const getHistorial = async(req, res) => {
  try {
    const user = req.user;
    const historial = await Prompt.find({userId: user._id}).sort({createdAt: -1}).limit(10);
    return res.status(200).json(historial);

  } catch (error) {
    console.error("Error in getHistorial", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}