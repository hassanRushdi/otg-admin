import React from "react";
import { Table, Tabs } from "antd";
import { courseColumns } from "./Columns";

const { TabPane } = Tabs;

export const coursesDummyData = [
  {
    course_id: 1,
    user_id: 1,
    discount_id: 1,
    course_program_id: 1,
    title_en: "Java Programming",
    title_ar: "برمجة جافا",
    description_en: "An introductory course to Java programming.",
    description_ar: "دورة تمهيدية في البرمجة باستخدام جافا.",
    benefit: "Build a strong foundation in Java and prepare for certifications.",
    has_exam: true,
    created_at: "2025-03-26 10:57:03.0",
    price: 200.0,
    has_discount: false,
    final_price: 200.0,
    hours: 40,
    total_number_of_modules: 8,
    number_of_sessions: 16,
    duration: 90,
    image: "https://via.placeholder.com/100x60?text=Java+1",
    course_status: 0,
    next_course: "2025-06-01 10:00:00.0",
    course_start_date: "2025-06-02 09:00:00.0",
    allowed_absent_days: 2,
    complete_percentage: 0
  },
  {
    course_id: 2,
    user_id: 1,
    discount_id: 1,
    course_program_id: 1,
    title_en: "Java Programming 2",
    title_ar: "برمجة جافا 2",
    description_en: "Intermediate Java programming topics and projects.",
    description_ar: "دورة لمفاهيم البرمجة المتوسطة في جافا.",
    benefit: "Solidify your Java skills with real-world projects.",
    has_exam: true,
    created_at: "2025-03-27 08:08:40.0",
    price: 250.0,
    has_discount: true,
    final_price: 200.0,
    hours: 50,
    total_number_of_modules: 10,
    number_of_sessions: 20,
    duration: 120,
    image: "https://via.placeholder.com/100x60?text=Java+2",
    course_status: 1,
    next_course: "2025-07-01 10:00:00.0",
    course_start_date: "2025-07-03 09:00:00.0",
    allowed_absent_days: 3,
    complete_percentage: 40
  },
  {
    course_id: 3,
    user_id: 1,
    discount_id: 1,
    course_program_id: 2,
    title_en: "Advanced Java Programming",
    title_ar: "برمجة جافا المتقدمة",
    description_en: "Advanced topics like concurrency, memory management, and design patterns.",
    description_ar: "مفاهيم متقدمة في البرمجة باستخدام جافا.",
    benefit: "Master Java to build enterprise-grade applications.",
    has_exam: true,
    created_at: "2025-04-01 11:00:00.0",
    price: 300.0,
    has_discount: true,
    final_price: 250.0,
    hours: 60,
    total_number_of_modules: 12,
    number_of_sessions: 24,
    duration: 120,
    image: "https://via.placeholder.com/100x60?text=Java+Advanced",
    course_status: 2,
    next_course: "2025-08-01 09:00:00.0",
    course_start_date: "2025-08-03 09:00:00.0",
    allowed_absent_days: 2,
    complete_percentage: 100
  }
];


const CoursesTab = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Courses" key="1">
        <Table
          dataSource={coursesDummyData}
          columns={courseColumns}
          rowKey="course_id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      </TabPane>
    </Tabs>
  );
};

export default CoursesTab;
