import { useState } from "react";
import Navbar from "./Navbar";
import { uploadEggImage } from "./api/egg";

interface ClassificationResult {
  cluster: number;
  size: string;
}

function App() {
  const [image, setImage] = useState<File | null>(null); 
  const [preview, setPreview] = useState<string | null>(null); 
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setResult(null); // Reset previous classification
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClassify = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await uploadEggImage(image);
      setResult(response);
    } catch (error: any) {
      console.error(error);
      setResult({ cluster: -1, size: "Failed to classify" });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="flex justify-center flex-col items-center gap-10 p-10">
      <Navbar />

      {/* Single Container */}
      <div className="flex flex-col items-center w-full max-w-2xl gap-6 rounded-xl shadow-lg bg-white p-6 mt-20">
        {/* Upload */}
        <label className="bg-gray-100 w-full h-[300px] rounded-xl flex flex-col justify-center items-center cursor-pointer hover:bg-gray-200 transition relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

          {preview ? (
            <img
              src={preview}
              alt="Uploaded Egg"
              className="object-contain w-full h-full rounded-xl"
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4"
                />
              </svg>

              <p className="text-gray-500 font-primary text-center">
                Click here to upload your egg image
              </p>
            </>
          )}
        </label>

        {/* Result */}
        <div className="w-full flex justify-center items-center min-h-[60px]">
          {loading ? (
            <p className="text-gray-400 text-center font-primary">
              Classifying...
            </p>
          ) : result ? (
            <div className="text-center bg-green-100 text-green-800 px-6 py-3 rounded-lg font-medium text-lg">
              This egg is classified as <strong>{result.size}</strong>.
            </div>
          ) : (
            <p className="text-gray-400 text-center font-primary">
              Your classification result will appear here
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 w-full">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className={`bg-primary text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition ${
              !image ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleClassify}
            disabled={!image || loading}
          >
            {loading ? "Classifying..." : "Classify"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

