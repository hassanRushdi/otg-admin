import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Tag } from "antd";

export const examColumns = [
  {
    title: "Exam Title",
    dataIndex: "title_en",
    key: "title_en",
  },
  {
    title: "Total Marks",
    dataIndex: "total_marks",
    key: "total_marks",
  },
  {
    title: "Passing Marks",
    dataIndex: "passing_marks",
    key: "passing_marks",
  },
  {
    title: "Duration (mins)",
    dataIndex: "duration_minutes",
    key: "duration_minutes",
  },
  {
    title: "Exam Type",
    dataIndex: "exam_type",
    key: "exam_type",
    render: (type) => {
      let text = '';
      switch (type) {
        case 1:
          text = 'Pre-Test';
          break;
        case 2:
          text = 'Post-Test';
          break;
        case 3:
          text = 'Final Exam';
          break;
        default:
          text = 'Unknown';
      }
      return <Tag color={type === 3 ? 'red' : 'blue'}>{text}</Tag>;
    },
  },
  {
    title: "Start Date",
    dataIndex: "final_exam_start_date",
    key: "final_exam_start_date",
  },
  {
    title: "End Date",
    dataIndex: "final_exam_end_date",
    key: "final_exam_end_date",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="edit">Edit</Menu.Item>
            <Menu.Item key="delete">Delete</Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];