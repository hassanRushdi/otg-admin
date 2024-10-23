import { Tag } from 'antd';

export const Columns = (showMessageModal, t) => [
    {
        title: t('first_name'),
        dataIndex: 'first_name',
        key: 'first_name',
        render: (text) => <div>{text}</div>,
        width: '10%',
    },
    {
        title: t('last_name'),
        dataIndex: 'last_name',
        key: 'last_name',
        render: (text) => <div>{text}</div>,
        width: '10%',
    },

    {
        title: t('email'),
        dataIndex: 'email',
        key: 'email',
        render: (text) => <div>{text}</div>,
        width: '15%',
    },
    {
        title: t('phone'),
        dataIndex: 'phone',
        key: 'phone',
        render: (text) => <div>{text}</div>,
        width: '15%',
    },
    {
        title: t('date_label'),
        dataIndex: 'date',
        key: 'date',
        render: (text) => <div>{text}</div>,
        width: '20%',
    },
    {
        title: t('message'),
        dataIndex: 'message',
        key: 'message',
        render: (text, repo) => (
            <div className='blog_details_data'>
                <a onClick={() => showMessageModal(text, repo)}>{String(text)?.split(" ").slice(0, 5).join(" ") + "..."}</a>
            </div>
        ),
        width: '20%',
    },
    {
        title: t('status_label'),
        dataIndex: 'status',
        key: 'status',
        render: (text) => <>{
            text == 1 ?
                <Tag color="green"> {t('Read')}</Tag> :
                <Tag color="red"> {t('NotRead')} </Tag>
        }</>,
        width: '20%',
    },
];