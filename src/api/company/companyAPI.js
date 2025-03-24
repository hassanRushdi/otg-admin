import axios from "axios";

const API_BASE_URL = "https://vigtas.co/lms";
const TOKEN = localStorage.getItem('token');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${TOKEN}`, 
  },
});

export const getCompanies = async () => {
  try {
    const response = await api.get("/company");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
};

export const addCompany = async (companyData) => {
  try {
    const response = await api.post("/company", companyData);
    return response.data;
  } catch (error) {
    console.error("Error adding company:", error);
    return null;
  }
};

export const updateCompany = async (companyData) => {
  try {
    const response = await api.put(`/update-company`, companyData);
    return response.data;
  } catch (error) {
    console.error("Error updating company:", error.response ? error.response.data : error);
    return null;
  }
};

export const verifyCompany = async (companyId) => {
  try {
    const response = await api.put(`/verify-company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error verifying company:", error);
    return null;
  }
};

export const addStudentToCompany = async (studentId, companyId) => {
  try {
    const response = await api.put(`/add-student-to-company/${studentId}`, { company_id: companyId });
    return response.data;
  } catch (error) {
    console.error("Error assigning student to company:", error);
    return null;
  }
};
