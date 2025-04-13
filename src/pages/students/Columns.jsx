import { t } from "i18next";
import { Button, Space, Popconfirm, Avatar, Tag, Menu, Dropdown } from "antd";
import { EditOutlined, DeleteOutlined, StopOutlined, CheckOutlined, DownOutlined, MoreOutlined } from "@ant-design/icons";
import ChangePasswordModal from "@components/common/ChangePasswordModal";
import EditStudentModal from "@components/common/EditStudentModal";


export const Columns = (onUpdate, handleBan, handleDelete) => [
  {
    title: "Profile Image",
    dataIndex: "student_image",
    key: "student_image",
    render: (url) => (
      url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img 
            src={url} 
            alt="Student" 
            style={{ 
              width: 50, 
              height: 50, 
              objectFit: 'cover',
              borderRadius: '50%' 
            }} 
          />
        </a>
      ) : (
        <span>No Image</span>
      )
    ),
  },
    // {
    //     title: t("ID"),
    //     dataIndex: "student_id",
    //     key: "student_id",
    //     render: (text) => <div>{text}</div>,
    //   },
      {
        title: t("Name"),
        dataIndex: "name",
        key: "name",
        render: (text) => <div>{text}</div>,
      },
      {
        title: t("Email"),
        dataIndex: "email",
        key: "email",
        render: (text) => <div>{text}</div>,
      },
      {
        title: t("Phone"),
        dataIndex: "phone_number",
        key: "phone_number",
        render: (text) => <div>{text}</div>,
      },
      {
        title: t("Title"),
        dataIndex: "student_title",
        key: "student_title",
        render: (text) => <div>{text || "N/A"}</div>,
      },
      {
        title: t("Company ID"),
        dataIndex: "student_company_id",
        key: "student_company_id",
        render: (text) => <div>{text}</div>,
      },
      {
        title: t("Joined Date"),
        dataIndex: "student_created_at",
        key: "student_created_at",
        render: (text) => <div>{text}</div>,
      },
      {
        title: t("Status"),
        dataIndex: "banned",
        key: "banned",
        render: (banned, record) => (
          <Popconfirm
            title={banned ? t("Unban this student?") : t("Ban this student?")}
            onConfirm={() => handleBan(record.student_id, !banned)}
            okText="Yes"
            cancelText="No"
          >
            <Tag color={banned ? "red" : "green"} style={{ cursor: "pointer" }}>
              {banned ? t("Banned") : t("Active")}
            </Tag>
          </Popconfirm>
        ),
      },
      
      {
        title: t("Actions"),
        key: "actions",
        render: (_, record) => {
          const menu = (
            <Menu>
              <Menu.Item key="edit">
                <EditStudentModal student={record} onUpdate={onUpdate} />
              </Menu.Item>
              <Menu.Item key="change-password">
                <ChangePasswordModal student={record} />
              </Menu.Item>
            </Menu>
          );
    
          return (
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button>
                <MoreOutlined />
              </Button>
            </Dropdown>
          );
        },
      },
]