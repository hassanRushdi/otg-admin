import {  EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const Columns = (handleEdit) => [
    {
      title: "Title",
      dataIndex: "banner_title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "banner_description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "banner_image",
      key: "image",
      render: (text) => <img src={text} alt="Banner" width={50} />,
    },
    {
      title: "Link",
      dataIndex: "banner_link",
      key: "link",
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
        </>
      ),
    },
  ];