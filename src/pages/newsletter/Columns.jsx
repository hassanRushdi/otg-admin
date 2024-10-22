import { Button } from 'antd';
import React from 'react';
import { truncateText } from '../../utils/shared';

export const Columns = (showMessageModal,t ) => [
 
    {
        title: t('email'),
        dataIndex: 'email',
        key: 'email',
        render: (text) => <div>{text}</div>, 
    },
   
    {
        title: t('date_label'), 
        dataIndex: 'date',
        key: 'date',
        render: (text) => <div>{text}</div>, 
    },
     
];