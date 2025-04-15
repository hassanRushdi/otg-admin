import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Select,
  message,
} from "antd";
import moment from "moment";

const { Option } = Select;

const AddExamForm = ({ onClose, onExamAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const examData = {
        pass_course_id: values.pass_course_id,
        fail_course_id: values.fail_course_id,
        chapter_id: values.chapter_id,
        title_en: values.title_en,
        total_marks: values.total_marks,
        exam_type: values.exam_type,
        passing_marks: values.passing_marks,
        duration_minutes: values.duration_minutes,
        final_exam_start_date: values.exam_date[0].format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        final_exam_end_date: values.exam_date[1].format("YYYY-MM-DD HH:mm:ss"),
        final_exam_duration_minutes: values.duration_minutes, // Add this field
      };

      console.log("Final payload:", JSON.stringify(examData, null, 2));
      await onExamAdded(examData);
    } catch (error) {
      message.error(error.message || "Failed to submit exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        exam_type: 3,
        total_marks: 100,
        passing_marks: 50,
        duration_minutes: 120,
        pass_course_id: 1,
        fail_course_id: 1, // Default to 1 instead of 0 or null
        chapter_id: 1,
      }}
    >
      <Form.Item
        name="title_en"
        label="Exam Title"
        rules={[{ required: true, message: "Please input exam title!" }]}
      >
        <Input placeholder="Enter exam title" />
      </Form.Item>

      <Form.Item
    name="chapter_id"
    label="Chapter ID"
    rules={[{ required: true, message: 'Required' }]}
  >
    <InputNumber min={1} style={{ width: '100%' }} />
  </Form.Item>

      <Form.Item
    name="pass_course_id"
    label="Pass Course ID"
    rules={[{ required: true, message: 'Required' }]}
  >
    <InputNumber min={1} style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item
    name="fail_course_id"
    label="Fail Course ID"
    rules={[{ required: true, message: 'Required' }]}
  >
    <InputNumber min={1} style={{ width: '100%' }} />
  </Form.Item>

      <Form.Item
        name="exam_type"
        label="Exam Type"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value={1}>Pre-Test</Option>
          <Option value={2}>Post-Test</Option>
          <Option value={3}>Final Exam</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="total_marks"
        label="Total Marks"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="passing_marks"
        label="Passing Marks"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="duration_minutes"
        label="Duration (minutes)"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="exam_date"
        label="Exam Date Range"
        rules={[{ required: true, message: "Please select exam date range!" }]}
      >
        <DatePicker.RangePicker
          showTime
          style={{ width: "100%" }}
          disabledDate={(current) =>
            current && current < moment().startOf("day")
          }
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Add Exam
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddExamForm;
