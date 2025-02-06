import Prompt from "../models/prompt.model.js";
import { main } from "../lib/api.js";

export const create = async (req, res) => {
  try {
    const { prompt, num = 3 } = req.query;
    const images = await main(prompt, num);

    if (!prompt) {
      return res.status(400).json({ error: "Se requiere un término de búsqueda" });
    }

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