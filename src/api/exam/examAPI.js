import axios from "axios";

const BASE_URL = "https://vigtas.co/lms";

export const fetchAllExams = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-exams`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error fetching exams');
  }
};

export const addExam = async (examData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-exam-details`, examData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error adding exam');
  }
};