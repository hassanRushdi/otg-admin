import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { getAttendanceColumns, getStudentColumns } from "./Columns";

const AttendancePage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch attendance data
  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://vigtas.co/lms/get-all-attendance");
      const data = await response.json();

      // Group data by session_id
      const groupedData = Object.values(
        data.reduce((acc, item) => {
          if (!acc[item.session_id]) {
            acc[item.session_id] = {
              key: item.session_id,
              session_id: item.session_id,
              course_title: item.course_title,
              session_start_time: item.session_start_time,
              session_end_time: item.session_end_time,
              students: [],
            };
          }

          // Avoid duplicate attendance records
          if (!acc[item.session_id].students.some((s) => s.attendance_id === item.attendance_id)) {
            acc[item.session_id].students.push({
              key: item.attendance_id,
              attendance_id: item.attendance_id,
              student_id: item.student_id,
              student_name: item.student_name,
              attendance_status: item.attendance_status,
              check_in_time: item.check_in_time,
              admin_check: item.admin_check,
            });
          }
          return acc;
        }, {})
      );

      setSessions(groupedData);
    } catch (error) {
      message.error("Failed to fetch attendance data.");
    }
    setLoading(false);
  };

  // Fetch data on mount
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  // Handle status update
  const handleStatusChange = async (sessionId, attendanceId, studentId, newStatus) => {
    if (!sessionId || !attendanceId || !studentId) {
      message.error("Invalid data for attendance confirmation.");
      return;
    }

    try {
      // Convert data to URL-encoded format
      const formBody = new URLSearchParams({
        attendance_status: String(newStatus),
        admin_check: "true",
      }).toString();

      console.log("Sending Form URL Encoded:", formBody);

      const response = await fetch(
        `https://vigtas.co/lms/confirm-attendance/${sessionId}/${attendanceId}/?student_id=${studentId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formBody,
        }
      );

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok) throw new Error(result.message || "Failed to confirm attendance");

      message.success("Attendance confirmed successfully!");

      // 🔄 Refresh data after update
      fetchAttendanceData();
    } catch (error) {
      message.error("Error confirming attendance.");
      console.error("Request Failed:", error);
    }
  };

  return (
    <Table
      columns={getAttendanceColumns()}
      dataSource={sessions}
      expandable={{
        expandedRowRender: (record) => (
          <Table
            columns={getStudentColumns(handleStatusChange, record.session_id)}
            dataSource={record.students}
            pagination={false}
          />
        ),
      }}
      loading={loading}
      rowKey="session_id"
    />
  );
};

export default AttendancePage;