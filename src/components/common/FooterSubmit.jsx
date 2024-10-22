import { Button, Form } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const FooterSubmit = ({ loading, path, action }) => {
    let { t } = useTranslation()

    return (
        <Form.Item className="flex justify-content-center gap-3">
            <Button type="primary" htmlType="submit" loading={loading} className="mx-4 px-5">
                {t('submit')}
            </Button>
            <Link to={path}>
                <Button onClick={action} className="px-5">
                    {t('cancel')}
                </Button>
            </Link>
        </Form.Item>
    )
}

export default FooterSubmit
