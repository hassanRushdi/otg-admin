import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getBanners, updateBanner } from "src/api/banner/bannerAPI";
import { Columns } from "./Columns.jsx";

const BannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
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

  const handleEdit = (record) => {
    setEditingBanner(record);
    form.setFieldsValue(record); 
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await updateBanner(editingBanner.id, values);
      message.success("Banner updated successfully!");
      setIsModalOpen(false);
      fetchBanners(); 
    } catch (error) {
      message.error("Failed to update banner");
    }
  };

  return (
    <div>
      <Table dataSource={banners} columns={Columns(handleEdit)} rowKey="id" loading={loading} />

      <Modal title="Edit Banner" open={isModalOpen} onOk={handleUpdate} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="banner_title" label="Title" rules={[{ required: true, message: "Title is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="banner_description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="banner_image" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item name="banner_link" label="Link">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BannerPage;