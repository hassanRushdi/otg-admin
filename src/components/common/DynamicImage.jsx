import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import { useTranslation } from 'react-i18next';

const DynamicImage = ({ label, onFileChange, fileList }) => {
    let { t } = useTranslation()

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{t('Upload')}</div>
        </div>
    );

    return (
        <Form.Item label={label}  >
            <Upload
                onChange={onFileChange}
                multiple={false}
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => false}
                customRequest={() => { }}
                accept="image/*"
            >
                {fileList.length < 1 && uploadButton}
            </Upload>
        </Form.Item>
    );
};

export default DynamicImage;
