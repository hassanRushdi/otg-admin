import axios from "axios";

export const uploadImage = async (file) => {
  if (!file) {
    console.error('No file provided for upload');
    return null;
  }

  console.log('Starting upload with file:', file.name, file.type, file.size);
  const formData = new FormData();
  formData.append("file", file);
  
  try {
    const response = await axios.post(
      "https://vigtas.live/uploader/uploads", 
      formData,
      { 
        headers: { 
          "Content-Type": "multipart/form-data" 
        }
      }
    );
    
    console.log('Upload response:', response);
    
    if (response.data && (response.data.url || response.data.path || response.data.file_path)) {
      const imagePath = response.data.url || response.data.path || response.data.file_path;
      console.log('Image uploaded successfully, path:', imagePath);
      return imagePath;
    } else {
      console.error('Upload response missing expected data:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Upload failed:', error.response?.data || error.message);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};