import axios from "axios";

const API_BASE_URL = "http://localhost:8080/lms";
const API_LIVE_URL = "https://vigtas.co/lms";

export const getBanners = async () => {
    try {
      const response = await axios.get(`${API_LIVE_URL}/get-all-banners`);
      return response.data;
    } catch (error) {
      console.error("Error fetching banners:", error);
      throw error;
    }
  };

  export const updateBanner = async (bannerId, data) => {
    try {
      const formData = new URLSearchParams();
  
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
  
      const response = await axios.post(
        `${API_LIVE_URL}/update-banner/${bannerId}`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error updating banner:", error);
      throw error;
    }
  };
  