import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Image, Menu } from "antd";
import { t } from "i18next";

export const Columns = (handleEdit) => [
 
    {
        title: t('program title'),
        dataIndex: 'course_program_title',
        key: 'course_program_title',
        render: (text) => <div>{text}</div>, 
    },
    {
        title: t('program description'),
        dataIndex: 'course_program_description',
        key: 'course_program_description',
        render: (text) => <div>{text}</div>, 
    },
    {
        title: t('program status'),
        dataIndex: 'course_program_status',
        key: 'course_program_status',
        render: (text) => <div>{text === 1 ? "Active" : "Inactive"}</div>, 
    },
    {
        title: t('thumbnail'),
        dataIndex: 'course_program_image',
        key: 'course_program_image',
        render: (image) =>
            image ? <Image width={50} src={`https://vigtas.co/uploads/${image}`} /> : "No Image",
    }, 
    {
        title: t("Actions"),
        key: "actions",
        render: (_, record) => (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="edit" onClick={() => handleEdit(record)}>
                  Edit
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        ),
      },
];