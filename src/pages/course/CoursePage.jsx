  import React, { useEffect, useState } from "react";
  import { Table, Modal, Descriptions, message, Button } from "antd";
 
  import { fetchAllCourses, addStudentToCourse } from "src/api/course/courseAPI";
  import CourseDetailsModal from "./CourseDetailsModal";
  import AddCourseForm from "./AddCourseForm";
import AddStudentForm from "./AddStudentForm";
import { courseColumns } from "./Columns";

  const CoursesTab = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [addCourseModalOpen, setAddCourseModalOpen] = useState(false);
    const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);

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

    const handleAddStudent = (course) => {
      setSelectedCourse(course);
      setAddStudentModalOpen(true);
    };

    const handleStudentAdded = async (studentData) => {
      try {
        console.log("Submitting enrollment data:", studentData); // log the sent data
        const response = await addStudentToCourse(studentData);
        console.log("Enrollment API response:", response); // log the API response
    
        message.success("Student added successfully!");
        setAddStudentModalOpen(false);
        loadCourses();
      } catch (error) {
        message.error("Failed to add student to the course");
        console.error("Error adding student:", error);
      }
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
          columns={courseColumns(handleAddStudent)}
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

        <Modal
        open={addStudentModalOpen}
        title="Add Student to Course"
        onCancel={() => setAddStudentModalOpen(false)}
        footer={null}
        width={800}
      >
        <AddStudentForm
          onClose={() => setAddStudentModalOpen(false)}
          onStudentAdded={handleStudentAdded}
          courseId={selectedCourse?.course_id}
        />
      </Modal>
      </>
    );
  };

  export default CoursesTab;
