// import OpenAI from "openai";
import { API_KEY } from "../../config.js";
import axios from "axios";

export async function main(prompt, num) {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
        headers: { Authorization: API_KEY },
        params: { query: prompt, per_page: num },
    });

    return response.data.photos.map(photo => ({
        id: photo.id,
        url: photo.src.original,
        photographer: photo.photographer,
    }));
  } catch (error) {
      console.error('Error al obtener imágenes', error);
  }
}