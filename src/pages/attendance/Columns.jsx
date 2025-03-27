import { Tag, Button, Space } from "antd";

export const getAttendanceColumns = () => [
  {
    title: "Course",
    dataIndex: "course_title",
    key: "course_title",
  },
  {
    title: "Session ID",
    dataIndex: "session_id",
    key: "session_id",
  },
  {
    title: "Session Start Time",
    dataIndex: "session_start_time",
    key: "session_start_time",
  },
  {
    title: "Session End Time",
    dataIndex: "session_end_time",
    key: "session_end_time",
  },
];

export const getStudentColumns = (handleStatusChange, sessionId) => [
  {
    title: "Student Name",
    dataIndex: "student_name",
    key: "student_name",
  },
  {
    title: "Attendance Status",
    dataIndex: "attendance_status",
    key: "attendance_status",
    render: (status) => {
      let statusText = status === 2 ? "Present" : status === 0 ? "Absent" : "Pending";
      let color = status === 2 ? "green" : status === 0 ? "red" : "orange";
      return <Tag color={color}>{statusText}</Tag>;
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, student) => (
      <Space>
        <Button
          type="primary"
          onClick={() => handleStatusChange(sessionId, student.attendance_id, student.student_id, 2)}
        >
          Mark Present
        </Button>
        <Button
          type="default"
          danger
          onClick={() => handleStatusChange(sessionId, student.attendance_id, student.student_id, 0)}
        >
          Mark Absent
        </Button>
      </Space>
    ),
  },
];