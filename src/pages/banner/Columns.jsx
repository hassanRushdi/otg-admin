import { EditOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";

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
    render: (image) => (
      image ? (
        <Image
          width={100}
          src={
            image.startsWith('http') 
              ? image 
              : `https://vigtas.co/uploader-1.0-SNAPSHOT/uploads/${image}`
          }
          style={{ objectFit: 'cover' }}
          preview={{
            mask: null,
          }}
        />
      ) : (
        <span>No Image</span>
      )
    ),
  },
  {
    title: "Link",
    dataIndex: "banner_link",
    key: "link",
    render: (text) => text ? (
      <a href={text} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    ) : "No Link",
  },
  {
    title: "Actions",
    key: "actions",
    render: (record) => (
      <Button 
        type="primary" 
        icon={<EditOutlined />} 
        onClick={() => handleEdit(record)}
      >
        Edit
      </Button>
    ),
  },
];