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

export const editStudentData = async (studentId, studentData) => {
  try {
    const formData = new FormData();
    Object.keys(studentData).forEach((key) => {
      formData.append(key, studentData[key]);
    });

    const response = await axios.post(`${API_BASE_URL}/update-registered-students/${studentId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error("Error updating student:", error);
    return false;
  }
};