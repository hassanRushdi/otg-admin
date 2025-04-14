import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

const AddStudentForm = ({ onClose, onStudentAdded, courseId }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const inputFields = [
    { key: "user_id", value: "1", type: "text" },
    { key: "company_id", value: "6", type: "text" },
    { key: "payment_method", value: "2", type: "text" },
    { key: "payment_status", value: "1", type: "text" },
    { key: "student_id", value: "", type: "text" },
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = { course_id: courseId, ...values };
      await onStudentAdded(payload);
    } catch (error) {
      message.error("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      name="add_student"
      initialValues={inputFields.reduce((acc, field) => {
        acc[field.key] = field.value;
        return acc;
      }, {})}
    >
      {inputFields.map((field) => (
        <Form.Item
          key={field.key}
          label={field.key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          name={field.key}
          rules={[{ required: true, message: `Please enter ${field.key}` }]}
        >
          <Input type={field.type} />
        </Form.Item>
      ))}

      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        style={{ marginTop: 20 }}
      >
        Add Student
      </Button>
    </Form>
  );
};

export default AddStudentForm;
