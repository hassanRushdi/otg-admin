import React from "react";
import { Modal, Descriptions } from "antd";

const CourseDetailsModal = ({ open, onClose, course }) => {
  return (
    <Modal
      open={open}
      title={course?.title_en}
      onCancel={onClose}
      footer={null}
    >
      {course && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Title">
            {course.title_en}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {course.description_en}
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            ${course.final_price}
            {course.has_discount && (
              <span
                style={{
                  marginLeft: 8,
                  textDecoration: "line-through",
                  color: "gray",
                }}
              >
                ${course.price}
              </span>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Hours">{course.hours}</Descriptions.Item>
          <Descriptions.Item label="Modules">
            {course.total_number_of_modules}
          </Descriptions.Item>
          <Descriptions.Item label="Sessions">
            {course.number_of_sessions}
          </Descriptions.Item>
          <Descriptions.Item label="Allowed Absence Days">
            {course.allowed_absent_days}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Progress">
            {course.complete_percentage}%
          </Descriptions.Item> */}
          <Descriptions.Item label="Start Date">
            {course.course_start_date}
          </Descriptions.Item>
          <Descriptions.Item label="Next Session">
            {course.next_course}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default CourseDetailsModal;