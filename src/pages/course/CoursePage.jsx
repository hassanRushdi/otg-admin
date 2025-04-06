import React, { useEffect, useState } from "react";
import { Table, Modal, Descriptions, message } from "antd";
import { courseColumns } from "./Columns";
import { fetchAllCourses } from "src/api/course/courseAPI";
import CourseDetailsModal from "./CourseDetailsModal";

// const { TabPane } = Tabs;

// export const dummyCourses = [
//   {
//     "course_id": 1,
//     "user_id": 1,
//     "discount_id": 1,
//     "course_program_id": 1,
//     "title_en": "Java Programming",
//     "title_ar": "برمجة جافا",
//     "description_en": "An introductory course to Java programming.",
//     "description_ar": "دورة تمهيدية في البرمجة باستخدام جافا",
//     "benefit": "This Java course provides a strong foundation in core Java programming, enabling you to build cross-platform applications and prepare for industry certifications.",
//     "has_exam": true,
//     "created_at": "2025-03-26 10:57:03.0",
//     "price": 199.99,
//     "has_discount": false,
//     "final_price": 179.99,
//     "hours": 40,
//     "total_number_of_modules": 10,
//     "number_of_sessions": 20,
//     "duration": 120,
//     "image": "https://vigtas.co/uploader-1.0-SNAPSHOT/uploads/java_image_url.jpg",
//     "course_status": 0,
//     "next_course": "2025-06-01 10:00:00.0",
//     "course_start_date": "2025-06-02 09:00:00.0",
//     "allowed_absent_days": 3,
//     "complete_percentage": 70
//   },
//   {
//     "course_id": 2,
//     "user_id": 1,
//     "discount_id": 1,
//     "course_program_id": 1,
//     "title_en": "Java Programming 2",
//     "title_ar": "برمجة جافا",
//     "description_en": "An introductory course to Java programming.",
//     "description_ar": "دورة تمهيدية في البرمجة باستخدام جافا",
//     "benefit": "This Java course provides a strong foundation in core Java programming, enabling you to build cross-platform applications and prepare for industry certifications.",
//     "has_exam": true,
//     "created_at": "2025-03-27 08:08:40.0",
//     "price": 199.99,
//     "has_discount": false,
//     "final_price": 179.99,
//     "hours": 40,
//     "total_number_of_modules": 10,
//     "number_of_sessions": 20,
//     "duration": 120,
//     "image": "https://vigtas.co/uploader-1.0-SNAPSHOT/uploads/java_image_url.jpg",
//     "course_status": 0,
//     "next_course": "2025-06-01 10:00:00.0",
//     "course_start_date": "2025-06-02 09:00:00.0",
//     "allowed_absent_days": 3,
//     "complete_percentage": 70
//   },
//   {
//     "course_id": 3,
//     "user_id": 1,
//     "discount_id": 1,
//     "course_program_id": 2,
//     "title_en": "Advanced Java Programming",
//     "title_ar": "برمجة جافا المتقدمة",
//     "description_en": "This course teaches advanced Java programming concepts.",
//     "description_ar": "تدرس هذه الدورة مفاهيم البرمجة المتقدمة في جافا.",
//     "benefit": "Learn advanced Java techniques and build robust applications.",
//     "has_exam": true,
//     "created_at": "2025-04-06 09:39:53.0",
//     "price": 199.99,
//     "has_discount": true,
//     "final_price": 149.99,
//     "hours": 40,
//     "total_number_of_modules": 5,
//     "number_of_sessions": 8,
//     "duration": 120,
//     "image": "https://vigtas.co/uploader-1.0-SNAPSHOT/uploads/course_image_url_here",
//     "course_status": 2,
//     "next_course": "2025-06-01 09:00:00.0",
//     "course_start_date": "2025-06-01 09:00:00.0",
//     "allowed_absent_days": 3,
//     "complete_percentage": 0
//   }
// ]

const CoursesTab = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Table
        dataSource={courses}
        columns={courseColumns}
        rowKey="course_id"
        loading={loading}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={{ pageSize: 5 }}
      />

      <CourseDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        course={selectedCourse}
      />
    </>
  );
};

export default CoursesTab;
