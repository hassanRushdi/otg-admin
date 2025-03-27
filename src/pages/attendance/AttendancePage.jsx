import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { getAttendanceColumns, getStudentColumns } from "./Columns";
import { fetchAttendanceData, updateAttendanceStatus } from "src/api/attendance/attendanceAPI";

const AttendanceTable = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch attendance data
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchAttendanceData();

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
            acc[item.session_id].students.push({
              key: item.attendance_id,
              attendance_id: item.attendance_id,
              student_id: item.student_id,
              student_name: item.student_name,
              attendance_status: item.attendance_status,
            });
            return acc;
          }, {})
        );

        setSessions(groupedData);
      } catch (error) {
        message.error(error.message);
      }
      setLoading(false);
    };

    getData();
  }, []);

  // Handle status update
  const handleStatusChange = async (attendanceId, newStatus) => {
    try {
      await updateAttendanceStatus(attendanceId, newStatus);
      message.success("Attendance status updated successfully!");

      // Update local state
      setSessions((prevSessions) =>
        prevSessions.map((session) => ({
          ...session,
          students: session.students.map((student) =>
            student.attendance_id === attendanceId
              ? { ...student, attendance_status: newStatus }
              : student
          ),
        }))
      );
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Table
      columns={getAttendanceColumns()}
      dataSource={sessions}
      expandable={{
        expandedRowRender: (record) => (
          <Table
            columns={getStudentColumns(handleStatusChange)}
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

export default AttendanceTable;
