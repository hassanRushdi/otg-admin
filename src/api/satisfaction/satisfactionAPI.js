import axios from "axios";

const BASE_URL = "https://vigtas.co/lms";

export const fetchSatisfactionForms = async (moduleId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get-satisfaction-form-questions/${moduleId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data : "Error fetching satisfaction forms"
    );
  }
};

export const addSatisfactionForm = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/add-satisfaction-form-details`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data : "Error adding satisfaction form"
    );
  }
};