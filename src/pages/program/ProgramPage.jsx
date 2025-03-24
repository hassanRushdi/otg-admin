import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Columns } from "./Columns";
import {
  addProgram,
  getPrograms,
  updateProgram,
} from "src/api/program/programAPI";

const ProgramsPage = ({ t }) => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const data = await getPrograms();
      if (data) {
        setPrograms(data);
      } else {
        message.error("Failed to load students.");
        setPrograms([]);
      }
    } catch (error) {
      message.error("Failed to load programs");
      setPrograms([]);
    }
    setLoading(false);
  };

  const showAddModal = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  const showEditModal = (program) => {
    setIsEditMode(true);
    setSelectedProgram(program);
    setIsModalVisible(true);
    form.setFieldsValue(program);
  };

  const handleFormSubmit = async (values) => {
    if (isEditMode) {
      await updateProgram({
        ...values,
        course_program_id: selectedProgram.course_program_id,
      });
      message.success("Program updated successfully!");
    } else {
      await addProgram(values);
      message.success("Program added successfully!");
    }
    setIsModalVisible(false);
    fetchPrograms();
  };

  return (
    <div>
      <Button type="primary" onClick={showAddModal}>
        Add Program
      </Button>

      <Table
        columns={Columns(showEditModal, t)}
        dataSource={programs}
        rowKey="course_program_id"
        loading={loading}
      />

      <Modal
        title={isEditMode ? "Edit Program" : "Add Program"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="course_program_title"
            label="Program Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="course_program_description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="course_program_status"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(value) =>
                form.setFieldValue("course_program_status", Number(value))
              }
            >
              <Select.Option value={1}>Active</Select.Option>
              <Select.Option value={0}>Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Upload Image">
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProgramsPage;
