import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Tag } from "antd";

// export const satisfactionFormColumns = (handleAddQuestions) => [
export const columns = (handleAddQuestions) => [
  {
    title: "Form Name",
    dataIndex: "form_name",
    key: "form_name",
  },
  {
    title: "Module ID",
    dataIndex: "module_id",
    key: "module_id",
  },
  {
    title: "Description",
    dataIndex: "form_description",
    key: "form_description",
    render: (text) => <span>{text || "-"}</span>,
  },
  {
    title: "Questions Count",
    key: "questions_count",
    render: (_, record) => <span>{record.questions?.length || 0}</span>,
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              key="view-questions"
              onClick={() => handleAddQuestions(record.module_id)}
            >
              View Questions
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];