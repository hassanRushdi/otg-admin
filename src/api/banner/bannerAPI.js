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
      const response = await axios.post(`${API_BASE_URL}/update-banner/${bannerId}`, new URLSearchParams(data), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating banner:", error);
      throw error;
    }
  };