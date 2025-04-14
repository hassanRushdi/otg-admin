import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Tag } from "antd";

export const courseColumns = (handleAddStudent) => [
  {
    title: "Course Name",
    dataIndex: "title_en",
    key: "title_en",
  },
  {
    title: "Status",
    dataIndex: "course_status",
    key: "course_status",
    render: (status) => {
      let color = '';
      let text = '';

      switch (status?.toString()) {
        case '0':
          color = 'green';
          text = 'Available';
          break;
        case '1':
          color = 'red';
          text = 'Completed';
          break;
        case '2':
          color = 'gold';
          text = 'Upcoming';
          break;
        default:
          color = 'gray';
          text = 'Unknown';
      }

      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: "Start Date",
    dataIndex: "course_start_date",
    key: "course_start_date",
  },
  {
    title: "Next Session",
    dataIndex: "next_course",
    key: "next_course",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      const menu = (
        <Menu
          onClick={({ key }) => {
            if (key === "add-student") {
              handleAddStudent(record);
            }
          }}
        >
          <Menu.Item key="add-student">Add Student</Menu.Item>
          
        </Menu>
      );
  
      return (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} onClick={(e) => e.stopPropagation()} />
        </Dropdown>
      );
    },
  }
];
