import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Select,
} from "antd";
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
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
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
    const imageValue = program.image
      ? program.image.replace(
          "https://vigtas.co/uploader-1.0-SNAPSHOT/uploads/",
          ""
        )
      : null;
      form.setFieldsValue({
        ...program,
        image: imageValue
      });
      setImageUrl(imageValue);
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://vigtas.co/uploader-1.0-SNAPSHOT/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Only store the filename, not the full URL
      const filename = response.data.fileName;
      setImageUrl(filename); // Store just the filename
      return filename; // Return just the filename
    } catch (error) {
      console.error("Upload failed:", error.response || error);
      message.error(`Upload failed: ${error.message}`);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        image: imageUrl,
      };

      if (isEditMode) {
        await updateProgram({
          ...payload,
          course_program_id: selectedProgram.course_program_id,
        });
        message.success("Program updated successfully!");
      } else {
        await addProgram(payload);
        message.success("Program added successfully!");
      }

      setIsModalVisible(false);
      fetchPrograms();
      form.resetFields();
      setImageUrl(null);
    } catch (error) {
      message.error("Operation failed.");
    }
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
            <Upload
              accept="image/*"
              showUploadList={false}
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const filename = await handleImageUpload(file);
                  onSuccess(filename, file);
                } catch (err) {
                  onError(err);
                }
              }}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
            </Upload>
            {imageUrl && (
              <img
                src={`https://vigtas.co/uploader-1.0-SNAPSHOT/uploads/${imageUrl}`}
                alt="Uploaded"
                style={{ width: 100, marginTop: 10 }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProgramsPage;
