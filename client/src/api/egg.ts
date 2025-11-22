import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

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

