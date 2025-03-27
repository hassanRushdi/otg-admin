import { message, Table, Button, Modal, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Columns } from "./Columns";
import { addCompany, getCompanies } from "src/api/company/companyAPI";

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await getCompanies();

      if (data) {
        setCompanies(
          data.map((company) => ({
            key: company.id,
            company_id: company.id,
            company_name: company.name,
            company_sector: company.sector || "N/A",
            company_status: company.status ? "Verified" : "Unverified",
          }))
        );
      } else {
        message.error("Failed to load companies.");
        setCompanies([]);
      }
    } catch (error) {
      message.error("Error fetching companies.");
      setCompanies([]);
    }
    setLoading(false);
  };

  const showAddModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleFormSubmit = async (values) => {
    try {  
      await addCompany(values);
      message.success("Company added successfully!");
      setIsModalVisible(false);
      fetchCompanies();
    } catch (error) {
      message.error("Failed to add company");
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: 16 }}
      >
        Add Company
      </Button>

      <Table
        columns={Columns()}
        dataSource={companies}
        rowKey="company_id"
        pagination={{ pageSize: 5 }}
        loading={loading}
      />

<Modal
        title={"Add Company"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          {/* Company Name */}
          <Form.Item
            name="company_name"
            label="Company Name"
            rules={[{ required: true, message: "Please enter the company name!" }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>

          {/* Company Sector */}
          <Form.Item
            name="company_sector"
            label="Sector"
            rules={[{ required: true, message: "Please select a sector!" }]}
          >
            <Input placeholder="Enter company sector" />
          </Form.Item>

          {/* Company Status */}
          <Form.Item
            name="company_status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select>
              <Option value={1}>Active</Option>
              <Option value={0}>Inactive</Option>
            </Select>
          </Form.Item>

          {/* Has Export Conciliation */}
          <Form.Item
            name="has_export_concil"
            label="Has Export Conciliation"
            rules={[{ required: true, message: "Please select an option!" }]}
          >
            <Select>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>

          {/* Company Export Conciliation Details */}
          <Form.Item
            name="company_export_concil"
            label="Export Conciliation Details"
            rules={[{ required: true, message: "Please provide export details!" }]}
          >
            <Input.TextArea placeholder="Enter export conciliation details" />
          </Form.Item>

          {/* User ID */}
          <Form.Item
            name="user_id"
            label="User ID"
            rules={[{ required: true, message: "Please enter the user ID!" }]}
          >
            <Input type="number" placeholder="Enter user ID" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompanyPage;
