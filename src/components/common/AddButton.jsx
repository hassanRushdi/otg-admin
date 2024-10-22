import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const AddButton = ({ path, action }) => {
    const {  t } = useTranslation();

    return (
        <>
            <Link to={path}>
                <Button icon={<PlusOutlined />} type='primary' onClick={action} style={{ marginBottom: '16px' }}>{t('add')}</Button>
            </Link>
        </>
    )
}
