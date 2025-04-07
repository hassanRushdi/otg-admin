import React, { useEffect, useState } from "react";
import { Table, Modal, Descriptions, message, Button } from "antd";
import { courseColumns } from "./Columns";
import { fetchAllCourses } from "src/api/course/courseAPI";
import CourseDetailsModal from "./CourseDetailsModal";
import AddCourseForm from "./AddCourseForm";

const CoursesTab = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addCourseModalOpen, setAddCourseModalOpen] = useState(false);

  const loadCourses = async () => {
    try {
      const data = await fetchAllCourses();
      setCourses(data);
    } catch (error) {
      message.error("Failed to fetch courses");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleRowClick = (record) => {
    setSelectedCourse(record);
    setModalOpen(true);
  };

  const handleAddCourse = () => {
    setAddCourseModalOpen(true);
  };

  const handleCourseAdded = () => {
    loadCourses(); 
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={handleAddCourse}
      >
        Add Course
      </Button>

      <Table
        dataSource={courses}
        columns={courseColumns}
        rowKey="course_id"
        loading={loading}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={{ pageSize: 10 }}
      />

      <CourseDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        course={selectedCourse}
      />

      <Modal
        open={addCourseModalOpen}
        title="Add New Course"
        onCancel={() => setAddCourseModalOpen(false)}
        footer={null}
        width={800}
      >
        <AddCourseForm
          onClose={() => setAddCourseModalOpen(false)}
          onCourseAdded={handleCourseAdded}
        />
      </Modal>
    </>
  );
};

export default CoursesTab;
