import { useState } from "react";
import NavBar from "./components/NavBar"
import axiosInstance from "./utils/axiosInstance";
import { ImageProps } from "./types/ImageProps";
import { defaultImages } from "./mocks/defaultImages";


function App() {
  const [images, setImages] = useState<ImageProps[]>(defaultImages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchImages = async (s: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/prompt/create", {
        params: {
          prompt: s,
        }
      });
      console.log(res)
      setImages(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-sky-900 text-white py-7 px-14">
      <NavBar onSearch={(s) => handleSearchImages(s)}/>
      {isLoading && (
        <p>Loading...</p>
      )}
      {images && (
        <div className="mt-30 grid grid-cols-3 gap-4 px-10">
          {images.map((image) => (
            <div key={image.id} className="w-full h-96 p-2">
              <img className="w-full h-full object-cover object-center rounded-lg shadow-lg" src={image.url} alt={image.photographer} />
              <p className="text-sm text-gray-300 font-medium mt-3">Photo by: <a href={image.url} className="font-semibold text-white hover:underline">{image.photographer}</a></p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App