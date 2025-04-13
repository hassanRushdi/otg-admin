import { Modal, Button, Form, Input, Select, message } from "antd";
import axios from "axios";

const AddModuleForm = ({ visible, onClose, chapterId, onModuleAdded }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const payload = {
      user_id: "1",
      chapter_id: chapterId.toString(),
      title_en: values.title_en,
      title_ar: values.title_ar || values.title_en, // fallback to English if Arabic not provided
      sequence_order: values.sequence_order || "1",
      num_of_sessions: values.num_of_sessions || "1",
      module_status: values.module_status.toString(),
      has_satisfaction_form: values.has_satisfaction_form?.toString() || "0"
    };

    try {
      await axios.post("https://vigtas.co/lms/add-module-details", payload);
      message.success("Module added successfully");
      form.resetFields();
      onModuleAdded?.();
      onClose();
    } catch (err) {
      message.error("Failed to add module");
      console.error(err);
    }
  };

  return (
    <Modal
      title="Add Module"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title_en"
          label="Module Title (English)"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title_ar"
          label="Module Title (Arabic)"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sequence_order"
          label="Sequence Order"
          initialValue={1}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="num_of_sessions"
          label="Number of Sessions"
          initialValue={1}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="module_status"
          label="Module Status"
          rules={[{ required: true }]}
          initialValue="1"
        >
          <Select>
            <Select.Option value="0">Inactive</Select.Option>
            <Select.Option value="1">Active</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="has_satisfaction_form"
          label="Has Satisfaction Form"
          initialValue="0"
        >
          <Select>
            <Select.Option value="0">No</Select.Option>
            <Select.Option value="1">Yes</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Module
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModuleForm;