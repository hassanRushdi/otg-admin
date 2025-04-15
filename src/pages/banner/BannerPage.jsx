import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Image,
} from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { getBanners, updateBanner } from "src/api/banner/bannerAPI";
import { Columns } from "./Columns.jsx";
import axios from "axios";

const BannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (error) {
      message.error("Failed to fetch banners");
    }
    setLoading(false);
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

      const filename = response.data.fileName;
      setImageUrl(filename);
      return filename;
    } catch (error) {
      console.error("Upload failed:", error.response || error);
      message.error(`Upload failed: ${error.message}`);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (record) => {
    setEditingBanner(record);
    form.setFieldsValue({
      banner_title: record.banner_title,
      banner_description: record.banner_description,
      banner_link: record.banner_link,
      banner_image: record.banner_image,
      page_name: record.page_name, // required by backend
    });
    setImageUrl(record.banner_image);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        ...values,
        banner_image: imageUrl || values.banner_image || "",
        page_name: values.page_name || editingBanner.page_name || "", // Make sure page_name is included
      };

      // Convert all to strings to satisfy x-www-form-urlencoded
      const stringifiedPayload = {};
      Object.keys(payload).forEach((key) => {
        stringifiedPayload[key] = String(payload[key] ?? "");
      });

      console.log("Final payload:", stringifiedPayload); // Debug

      await updateBanner(editingBanner.banner_id, stringifiedPayload); // banner_id instead of id if needed

      message.success("Banner updated successfully!");
      setIsModalOpen(false);
      fetchBanners();
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update banner");
    }
  };

  return (
    <div>
      <Table
        dataSource={banners}
        columns={Columns(handleEdit)}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="Edit Banner"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="banner_title"
            label="Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="banner_description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="banner_image" label="Banner Image">
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
              <Image
                width={200}
                src={`https://vigtas.co/uploader-1.0-SNAPSHOT/uploads/${imageUrl}`}
                style={{ marginTop: 10 }}
              />
            )}
          </Form.Item>

          <Form.Item name="banner_link" label="Link">
            <Input />
          </Form.Item>
          <Form.Item
            name="page_name"
            label="Page Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BannerPage;
