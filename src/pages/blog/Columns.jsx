import { DeleteOutlined } from '@ant-design/icons';
import { showNotification } from '@utils/notification';
import { Button } from 'antd';
import axios from 'axios';

export const Columns = (fetchData, t, wordLimit = 20) => [
    {
        title: t('title_en'),
        dataIndex: 'title',
        key: 'title',
        render: (text) => <div>{text}</div>,
        width: '10%',
    },
    {
        title: t('title_ar'),
        dataIndex: 'title_ar',
        key: 'title_ar',
        render: (text) => <div>{text}</div>,
        width: '10%',
    },
    {
        title: t('short_Desc_en_label'),
        dataIndex: 'short',
        key: 'short',
        render: (text) => <div>{text}</div>,
        width: '15%',
    },
    {
        title: t('short_Desc_ar_label'),
        dataIndex: 'short_ar',
        key: 'short_ar',
        render: (text) => <div>{text}</div>,
        width: '15%',
    },
    {
        title: t('Desc_en'),
        dataIndex: 'details',
        key: 'details',
        render: (text) => <div>{text}</div>,
        width: '20%',
    },
    {
        title: t('Desc_ar'),
        dataIndex: 'details_ar',
        key: 'details_ar',
        render: (text) => <div>{text}</div>,
        width: '20%',
    },
    {
        title: t('category_name_en'),
        dataIndex: 'category',
        key: 'category',
        render: (text) => <div>{text}</div>,
        width: '25%',
    },
    {
        title: t('category_name_ar'),
        dataIndex: 'category_ar',
        key: 'category_ar',
        render: (text) => <div>{text}</div>,
        width: '30%',
    },
    {
        key: 'actions',
        render: (text, record) => (
            <Button
                onClick={() => {
                    handleDeleteConfirm(record, fetchData, t)
                }}
                color="danger"
                icon={< DeleteOutlined />}
                size='middle'
            />
        ),

    },
];


const handleDeleteConfirm = async (record, fetchData, t) => { 
    let { data } = await axios.post(`https://vigtas.live/otgweb/remove_blog?blog_id=${record.id}`);
    fetchData()
    showNotification('success', 'Delete Successful', data?.msg);

};