import axios from "axios";

const API_BASE_URL = "https://vigtas.co/lms";

export const fetchAttendanceData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-all-attendance`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch attendance data");
  }
};

export const updateAttendanceStatus = async (attendanceId, newStatus) => {
  try {
    await axios.patch(`${API_BASE_URL}/update-attendance/${attendanceId}`, {
      attendance_status: newStatus,
    });
    return true;
  } catch (error) {
    throw new Error("Error updating attendance.");
  }
};
