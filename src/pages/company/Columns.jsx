import { t } from "i18next";
import { Button, Space, Popconfirm, Menu, Dropdown, message } from "antd";
import { EditOutlined, CheckOutlined, UserAddOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditCompanyModal from "@components/common/EditCompanyModal";
import { verifyCompany } from "src/api/company/companyAPI";
import AssignStudentModal from "@components/common/AssignStudentModal";

export const Columns = (fetchCompanies) => {
  const [modalType, setModalType] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const openModal = (type, company) => {
    setSelectedCompany(company);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedCompany(null);
    setModalType(null);
  };

  const handleVerify = async (companyId) => {
    const success = await verifyCompany(companyId);
    if (success) {
      message.success("Company verified successfully!");
      fetchCompanies();
    } else {
      message.error("Failed to verify company.");
    }
  };

  return [
    { title: "Company Name", dataIndex: "company_name", key: "company_name" },
    {
      title: "Status",
      dataIndex: "company_status",
      key: "company_status",
    },
    {
      title: "Export Council Details",
      dataIndex: "company_export_concil",
      key: "company_export_concil",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item key="verify" icon={<CheckOutlined />} onClick={() => handleVerify(record.company_id)}>
              Verify Company
            </Menu.Item>
            <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => openModal("edit", record)}>
              Edit Company
            </Menu.Item>
            <Menu.Item key="assign" icon={<UserAddOutlined />} onClick={() => openModal("assign", record)}>
              Assign Student
            </Menu.Item>
          </Menu>
        );

        return (
          <Space>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button icon={<MoreOutlined />} />
            </Dropdown>

            {modalType === "edit" && selectedCompany && (
              <EditCompanyModal company={selectedCompany} onClose={closeModal} onUpdate={fetchCompanies} />
            )}
            
            {modalType === "assign" && selectedCompany && (
              <AssignStudentModal 
                company={selectedCompany} 
                onClose={closeModal} 
                onSuccess={fetchCompanies}
              />
            )}
          </Space>
        );
      },
    },
  ];
};
