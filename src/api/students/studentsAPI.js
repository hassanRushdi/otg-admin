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


export const changeStudentPassword = async (studentId, currentPassword, newPassword) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/Admin-change-student-password/${studentId}`,
      new URLSearchParams({
        current_password: currentPassword,
        new_password: newPassword,
      }).toString(), 
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    console.log("API Response:", response.data); 

    if (response.status === 200) {
      if (response.data.success) {
        return { success: true, message: response.data.message || "Password changed successfully!" };
      } else {
        return { success: false, message: response.data.message || "Failed to change password." };
      }
    } else {
      return { success: false, message: "Unexpected server response." };
    }
  } catch (error) {
    console.error("Error changing password:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};