import axios from "axios";

const BASE_URL = "https://vigtas.co/lms";

export const fetchAllCourses = async () => {
  const response = await axios.get(`${BASE_URL}/get-all-courses`);
  return response.data;
};

export const addCourse = async (courseData) => {
  try {
    const response = await axios.post('https://vigtas.co/lms/add-course-details', courseData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error adding course');
  }
};


export const addChapter = async (chapterData) => {
  try {
    const response = await axios.post(`https://vigtas.co/lms/add-chapter-details`, chapterData);
    return response.data;
  } catch (error) {
    console.error('Error adding chapter:', error);
    throw error;
  }
};

export const addStudentToCourse = async (enrollmentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-enrollment`, enrollmentData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error adding student to course');
  }
};
