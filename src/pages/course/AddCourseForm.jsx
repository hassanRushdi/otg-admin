import React, { useState } from "react";
import { Button, Form, Input, notification, Select } from "antd";
import { addCourse } from "src/api/course/courseAPI";
import { formatDateTime } from "@utils/formateDateTime";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddCourseForm = ({ onClose, onCourseAdded }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [description, setDescription] = useState('')

  const handleAddCourse = async (values) => {
    const courseData = {
      user_id: 1,
      course_program_id: 2,
      discount_id: 1,
      title_en: values.title_en,
      description_en: description,
      has_exam: values.has_exam === "true" || values.has_exam === true,
      price: values.price,
      has_discount:
        values.has_discount === "true" || values.has_discount === true,
      final_price: values.final_price,
      total_number_of_modules: values.total_number_of_modules,
      number_of_sessions: values.number_of_sessions,
      duration: values.duration,
      course_status: values.course_status,
      next_course: formatDateTime(values.next_course),
      course_start_date: formatDateTime(values.course_start_date),
      allowed_absent_days: values.allowed_absent_days,
      image: values.image,
      final_exam_start_date: formatDateTime(values.final_exam_start_date),
      final_exam_end_date: formatDateTime(values.final_exam_end_date),
      final_exam_duration: values.final_exam_duration,
    };

    try {
      await addCourse(courseData);
      notification.success({
        message: "Course Added Successfully!",
      });
      form.resetFields();
      setDescription("");
      onCourseAdded?.();
      onClose?.();
    } catch (error) {
      notification.error({
        message: "Error Adding Course",
        description: error.message,
      });
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <>
      <Form form={form} onFinish={handleAddCourse} layout="vertical">
        <Form.Item
          name="title_en"
          label="Course Title (English)"
          rules={[{ required: true, message: "Please input course title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
        label="Course Description (English)"
        required
        rules={[
          {
            validator: (_, value) =>
              description.trim()
                ? Promise.resolve()
                : Promise.reject("Please input course description!"),
          },
        ]}
      >
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={description}
          onChange={setDescription}
          style={{ height: "200px", marginBottom: "40px" }}
        />
      </Form.Item>
      
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input course price!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="final_price"
          label="Final Price"
          rules={[
            { required: true, message: "Please input final course price!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="total_number_of_modules"
          label="Total Modules"
          rules={[
            {
              required: true,
              message: "Please input total number of modules!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="number_of_sessions"
          label="Number of Sessions"
          rules={[
            { required: true, message: "Please input number of sessions!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={[{ required: true, message: "Please input course duration!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="course_status"
          label="Course Status"
          rules={[{ required: true, message: "Please select course status!" }]}
        >
          <Select placeholder="Select status">
            <Option value="0">Available</Option>
            <Option value="2">Upcoming</Option>
            <Option value="1">Completed</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="next_course"
          label="Next Course Date"
          rules={[
            { required: true, message: "Please input next course date!" },
          ]}
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item
          name="course_start_date"
          label="Course Start Date"
          rules={[
            { required: true, message: "Please input course start date!" },
          ]}
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item
          name="allowed_absent_days"
          label="Allowed Absent Days"
          rules={[
            { required: true, message: "Please input allowed absent days!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image URL"
          rules={[
            { required: true, message: "Please input course image URL!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="final_exam_start_date"
          label="Final Exam Start Date"
          rules={[
            { required: true, message: "Please input final exam start date!" },
          ]}
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item
          name="final_exam_end_date"
          label="Final Exam End Date"
          rules={[
            { required: true, message: "Please input final exam end date!" },
          ]}
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item
          name="final_exam_duration"
          label="Final Exam Duration (in hours)"
          rules={[
            { required: true, message: "Please input final exam duration!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Course
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCourseForm;
