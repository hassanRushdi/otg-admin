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
      transformRequest: [(data) => {
        console.log('Sending:', data); 
        return JSON.stringify(data);
      }]
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Exam creation failed');
  }
};

export const addQuestionsWithChoices = async (examId, questionsData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/add-question-choices-details`,
      questionsData, // Send the already formatted data directly
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Question API Error:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Error adding questions');
  }
};