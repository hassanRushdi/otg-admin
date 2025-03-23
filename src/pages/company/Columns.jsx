import { t } from "i18next";
import { Button, Space, Popconfirm, Avatar, Menu, Dropdown } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
  UserAddOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import ChangePasswordModal from "@components/common/ChangePasswordModal";
import EditStudentModal from "@components/common/EditStudentModal";

export const Columns = () => [
  //  { title: "Company ID", dataIndex: "company_id", key: "company_id" },
  { title: "Name", dataIndex: "company_name", key: "company_name" },
  {
    title: "Status",
    dataIndex: "company_status",
    key: "company_status",
    render: (status) => (status ? "Verified" : "Unverified"),
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
            <AssignStudentModal company={selectedCompany} onClose={closeModal} onUpdate={fetchCompanies} />
          )}
        </Space>
      );
    },
  },
];
