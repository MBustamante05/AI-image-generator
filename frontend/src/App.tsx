import { useEffect, useState } from "react";
import NavBar from "./components/NavBar"
import axiosInstance from "./utils/axiosInstance";

type ImageProps = {
  id: number,
  url: string,
  photographer: string
}
function App() {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getImages = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/prompt/create", {
        params: {
          prompt: "A cute cat",
          num: 3
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

  useEffect(() => {
    getImages();
  },[]);
  return (
    <div className="min-h-screen bg-gray-900 text-white py-7 px-14">
      <NavBar />
      {isLoading && (
        <p>Loading...</p>
      )}
      {images && (
        <div className="flex flex-wrap justify-center gap-4">
          {images.map((image) => (
            <div key={image.id} className="w-1/4 p-2">
              <img className="w-full h-auto rounded" src={image.url} alt={image.photographer} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App