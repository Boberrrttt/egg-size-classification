import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const uploadEggImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_URL}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error uploading egg image:", error);
    throw new Error(error?.response?.data?.message || "Failed to upload egg image");
  }
};

export { uploadEggImage };

