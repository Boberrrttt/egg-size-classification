import { useState } from "react";
import Navbar from "./Navbar";

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null); // Reset previous classification
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleClassify = () => {
    if (image) {
      // Hardcoded result for now
      setResult("Grade A Egg – Fresh and Intact");
    }
  };

  const handleClear = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="flex justify-center flex-col items-center gap-20"> 
      <Navbar/>

      <div className="w-full flex px-10 gap-10">
        {/* Left: Upload Container */}
        <div className="flex relative flex-1 justify-center items-center h-[60vh] w-[40%] rounded-xl shadow-lg bg-white">
          <label className="bg-gray-100 w-[85%] h-[80%] rounded-xl flex flex-col justify-center items-center cursor-pointer hover:bg-gray-200 transition relative">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {image ? (
              <>
                <img
                  src={image}
                  alt="Uploaded Egg"
                  className="object-contain w-full h-full rounded-xl"
                />
              </>
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
        </div>

        <div className="flex-1 h-[60vh] rounded-xl shadow-lg bg-white p-6 flex flex-col justify-between">
          {/* Top: Result / Placeholder */}
          <div className="flex-1 flex justify-center items-center">
            {result ? (
              <div className="text-center bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                {result}
              </div>
            ) : (
              <p className="text-gray-400 text-center font-primary">
                Your classification result will appear here
              </p>
            )}
          </div>

          {/* Bottom: Buttons */}
          <div className="flex justify-end gap-4">
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
              disabled={!image}
            >
              Classify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

