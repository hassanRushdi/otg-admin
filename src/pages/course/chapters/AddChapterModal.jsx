import { Modal, Button, Form, Input, Select, message } from "antd";
import axios from "axios";

const AddChapterForm = ({ visible, onClose, courseId, onChapterAdded }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const payload = {
      course_id: courseId.toString(),
      user_id: "1",
      title_en: values.title_en,
      title_ar: values.title_ar,
      chapter_status: values.chapter_status.toString(),
      has_pre_test: values.has_pre_test.toString(),
      has_post_test: values.has_post_test.toString(),
      number_of_modules: values.number_of_modules.toString()
    };

    try {
      await axios.post("https://vigtas.co/lms/add-chapter-details", payload);
      message.success("Chapter added successfully");
      form.resetFields();
      onChapterAdded?.();
      onClose();
    } catch (err) {
      message.error("Failed to add chapter");
      console.error(err);
    }
  };

  return (
    <Modal
      title="Add Chapter"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title_en" label="Chapter Title (English)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="title_ar" label="Chapter Title (Arabic)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="chapter_status" label="Chapter Status" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="0">Inactive</Select.Option>
            <Select.Option value="1">Active</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="has_pre_test" label="Has Pre-Test" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="1">Yes</Select.Option>
            <Select.Option value="0">No</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="has_post_test" label="Has Post-Test" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="1">Yes</Select.Option>
            <Select.Option value="0">No</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="number_of_modules" label="Number of Modules" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Chapter
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddChapterForm;
