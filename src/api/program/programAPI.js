import axios from "axios";

const API_BASE_URL = "https://vigtas.co/lms";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const getPrograms = async () => {
  try {
    const response = await api.get("/program");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching programs:", error);
    return [];
  }
};

export const addProgram = async (programData) => {
    try {
      const formData = new FormData();
      formData.append("course_program_title", programData.course_program_title);
      formData.append("course_program_description", programData.course_program_description);
      formData.append("course_program_status", Number(programData.course_program_status));
      
      if (programData.image instanceof File) {
        formData.append("course_program_image", programData.image);
      }
  
      const response = await api.post("/add-program", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error adding program:", error.response ? error.response.data : error);
      return null;
    }
  };

export const updateProgram = async (programData) => {
    try {
        const formEncodedData = new URLSearchParams();
        Object.entries(programData).forEach(([key, value]) => {
          formEncodedData.append(key, value);
        });
    
        const response = await api.post("/update-program", formEncodedData);
    
        return response.data;
      } catch (error) {
    console.error(
      "Error updating program:",
      error.response ? error.response.data : error
    );
    return null;
  }
};
