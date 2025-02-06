import OpenAI from "openai";
import { API_KEY } from "../../config.js";

const openai = new OpenAI({
  apiKey: API_KEY,
});

export async function main(userPrompt) {
  const image = await openai.images.generate({ model: "dall-e-2", n: 10, prompt: userPrompt });

  return image.data;
}