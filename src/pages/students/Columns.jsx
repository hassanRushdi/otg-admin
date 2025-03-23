import { t } from "i18next";
import { Button, Space, Popconfirm, Avatar } from "antd";
import { EditOutlined, DeleteOutlined, StopOutlined, CheckOutlined } from "@ant-design/icons";
import ChangePasswordModal from "@components/common/ChangePasswordModal";
import EditStudentModal from "@components/common/EditStudentModal";


export const Columns = (onUpdate, handleBan, handleDelete) => [
  {
    title: t("Profile Image"),
    dataIndex: "student_image",
    key: "student_image",
    render: (src, record) => {
      const isValidImage = src;
      return (
        <Avatar
          src={isValidImage ? src : "https://via.placeholder.com/50"}
          alt={record.name}
          size={40}
        />
      );
    },
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
        render: (banned) => (
          <span style={{ color: banned ? "red" : "green", fontWeight: "bold" }}>
            {banned ? t("Banned") : t("Active")}
          </span>
        ),
      },
      
      {
        title: t("Actions"),
        key: "actions",
        render: (_, record) => (
          <Space>
            <EditStudentModal student={record} onUpdate={onUpdate} />
            {/* <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
              {t("Change Password")}
            </Button> */}
            <ChangePasswordModal />
    
            <Popconfirm
              title={record.banned ? t("Unban this student?") : t("Ban this student?")}
              onConfirm={() => handleBan(record.student_id, !record.banned)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={record.banned ? <CheckOutlined /> : <StopOutlined />} danger>
                {record.banned ? t("Unban") : t("Ban")}
              </Button>
            </Popconfirm>
    
            {/* <Popconfirm
              title={t("Are you sure you want to delete this student?")}
              onConfirm={() => handleDelete(record.student_id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="primary" danger>
                {t("Delete")}
              </Button>
            </Popconfirm> */}
          </Space>
        ),
      },
]