import { DeleteOutlined } from '@ant-design/icons';
import { showNotification } from '@utils/notification';
import { Button, Table } from 'antd';
import axios from 'axios';

export const Columns = (fetchData, t) => [
    {
        title: t('title_en'),
        dataIndex: 'title',
        key: 'title',
        render: (text) => <div>{text}</div>,
        width: '10%',
        ellipsis: true, 
    },
    {
        title: t('title_ar'),
        dataIndex: 'title_ar',
        key: 'title_ar',
        render: (text) => <div>{text}</div>,
        width: '10%',
        ellipsis: true,
    },
    {
        title: t('short_Desc_en_label'),
        dataIndex: 'short',
        key: 'short',
        render: (text) => <div>{text}</div>,
        width: '15%',
        ellipsis: true,
    },
    {
        title: t('short_Desc_ar_label'),
        dataIndex: 'short_ar',
        key: 'short_ar',
        render: (text) => <div>{text}</div>,
        width: '15%',
        ellipsis: true,
    },
    {
        title: t('Desc_en'),
        dataIndex: 'details',
        key: 'details',
        render: (text) => <div dangerouslySetInnerHTML={{ __html: String(text).split(" ").slice(0, 5).join(" ") + "..." }} />,
        width: '20%',
    },
    {
        title: t('Desc_ar'),
        dataIndex: 'details_ar',
        key: 'details_ar',
        render: (text) => <div dangerouslySetInnerHTML={{ __html: String(text).split(" ").slice(0, 5).join(" ") + "..." }} />,
        width: '20%',
    },
    {
        title: t('category_name_en'),
        dataIndex: 'category',
        key: 'category',
        render: (text) => <div>{text}</div>,
        width: '10%',
        ellipsis: true,
    },
    {
        title: t('category_name_ar'),
        dataIndex: 'category_ar',
        key: 'category_ar',
        render: (text) => <div>{text}</div>,
        width: '10%',
        ellipsis: true,
    },
    {
        key: 'actions',
        render: (text, record) => (
            <Button
                onClick={() => handleDeleteConfirm(record, fetchData, t)}
                icon={<DeleteOutlined />}
                size='middle'
            />
        ),
        width: '5%',
    },
];

const handleDeleteConfirm = async (record, fetchData, t) => {
    let { data } = await axios.post(`https://vigtas.live/otgweb/remove_blog?blog_id=${record.id}`);
    fetchData();
    showNotification('success', 'Delete Successful', data?.msg);
};
