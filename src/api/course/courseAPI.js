import axios from "axios";

const BASE_URL = "https://vigtas.co/lms";

export const fetchAllCourses = async () => {
  const response = await axios.get(`${BASE_URL}/get-all-courses`);
  return response.data;
};