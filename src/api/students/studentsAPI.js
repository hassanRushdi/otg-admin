import axios from 'axios';

const API_BASE_URL = 'https://vigtas.co/lms';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})


export const getStudents = async () => {
  try {
    const response = await api.get("/registered-students");
    return response.data?.data?.students || []; 
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};