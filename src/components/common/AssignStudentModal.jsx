import { Modal, Form, Input, message } from "antd";
import { useState } from "react";
import { addStudentToCompany } from "src/api/company/companyAPI";

const AssignStudentModal = ({ company, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const success = await addStudentToCompany(values.studentId, company.company_id);
      
      if (success) {
        message.success("Student assigned successfully!");
        onSuccess();
        onClose();
      } else {
        message.error("Failed to assign student");
      }
    } catch (error) {
      message.error("Error assigning student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Assign Student to ${company.company_name}`}
      visible={true}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="studentId"
          label="Student ID"
          rules={[{ required: true, message: "Please enter student ID" }]}
        >
          <Input type="number" placeholder="Enter student ID" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignStudentModal;