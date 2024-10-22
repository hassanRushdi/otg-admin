import { Button } from 'antd';
import React from 'react';
import { truncateText } from '../../utils/shared';

export const Columns = (showMessageModal,t ) => [
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
        render: (text) => <div>{text}</div>,        width: '15%',
    },
    {
        title: t('date_label'), 
        dataIndex: 'date',
        key: 'date',
        render: (text) => <div>{text}</div>,        width: '20%',
    },
    {
        title: t('message'), 
        dataIndex: 'message',
        key: 'message',
        render: (text) => (
            <div className='blog_details_data'>
                <a onClick={() => showMessageModal(text)}>{truncateText(text, 15)}</a>
            </div>
        ),
        width: '20%',
    }, 
];