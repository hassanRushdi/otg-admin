import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getStudents } from 'src/api/students/studentsAPI'
import { Columns } from './Columns';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const fetchStudents = async () => {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
      console.log(data)
      setLoading(false);
    };
    fetchStudents();
  }, [])
  return (
    <Table columns={Columns()} dataSource={students}  rowKey="student_id" pagination={{ pageSize: 10 }} loading={loading} />
  )
}

export default StudentsPage