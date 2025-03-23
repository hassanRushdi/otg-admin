import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getStudents } from "src/api/students/studentsAPI";
import { Columns } from "./Columns";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      if (data) {
        setStudents(data);
      } else {
        message.error("Failed to load students.");
        setStudents([]);
      }
    } catch (error) {
      message.error("Error fetching students.");
      setStudents([]);
    }
    setLoading(false);
  };

  return (
    <Table
      columns={Columns(fetchStudents)}
      dataSource={students}
      rowKey="student_id"
      pagination={{ pageSize: 10 }}
      loading={loading}
    />
  );
};

export default StudentsPage;
