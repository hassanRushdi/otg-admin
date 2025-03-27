import { message, Table, Button, Modal, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Columns } from "./Columns";
import { getCompanies, addCompany } from "src/api/company/companyAPI";

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
      console.log("Fetched Companies:", data); // Debugging
  
      if (Array.isArray(data)) {
        setCompanies(
          data.map((company) => ({
            key: company.company_id,
            company_id: company.company_id,
            company_name: company.company_name,
            company_sector: company.company_sector || "N/A",
            company_status: company.company_status ? "Verified" : "Unverified",
            export_council: company.company_has_export_council ? "Yes" : "N/A", // Fix applied here
          }))
        );
      } else {
        message.error("Invalid data format received.");
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
      <Button type="primary" onClick={showAddModal} style={{ marginBottom: 16 }}>
        Add Company
      </Button>

      <Table
        columns={Columns(fetchCompanies)} 
        dataSource={companies}
        rowKey="company_id"
        pagination={{ pageSize: 5 }}
        loading={loading}
      />

      <Modal
        title="Add Company"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="company_name"
            label="Company Name"
            rules={[{ required: true, message: "Please enter the company name!" }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>

          <Form.Item
            name="company_sector"
            label="Sector"
            rules={[{ required: true, message: "Please enter a sector!" }]}
          >
            <Input placeholder="Enter company sector" />
          </Form.Item>

          <Form.Item
            name="company_status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select>
              <Select.Option value={1}>Active</Select.Option>
              <Select.Option value={0}>Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="has_export_concil"
            label="Has Export Conciliation"
            rules={[{ required: true, message: "Please select an option!" }]}
          >
            <Select>
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="company_export_concil"
            label="Export Conciliation Details"
          >
            <Input.TextArea placeholder="Enter export conciliation details" />
          </Form.Item>

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
