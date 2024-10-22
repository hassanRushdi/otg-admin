import { UploadOutlined } from '@ant-design/icons';
import DynamicForm from '@components/common/DynamicForm';
import FooterSubmit from '@components/common/FooterSubmit';
import { Button, DatePicker, Form, Upload, message } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

const AddBlog = ({ onSuccess, handleCancel }) => {
    let { t } = useTranslation();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    let endpoint = 'blogs';

    const formik = useFormik({
        initialValues: {
            title: '',
            title_ar: '',
            short: '',
            short_ar: '',
            details: '',
            details_ar: '',
            category: '',
            category_ar: '', 
        },
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('title_ar', values.title_ar);
            formData.append('short', values.short);
            formData.append('short_ar', values.short_ar); 
            formData.append('details', values.details); 
            formData.append('details_ar', values.details_ar); 
            formData.append('category', values.category); 
            formData.append('category_ar', values.category_ar); 

            // Make the POST request
            setLoading(true);
            fetch(`https://vigtas.live/otgweb/blog`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setLoading(false);
                    onSuccess();
                })
                .catch((error) => {
                    setLoading(false);
                    message.error('Error submitting data');
                });
        },
    });

    const onFileChange = ({ fileList }) => {
        if (fileList.length > 1) {
            message.warning('You can only upload one file.');
            fileList = [fileList[fileList.length - 1]];
        }
        setFileList(fileList);
        formik.setFieldValue('image', fileList[0]?.originFileObj || null);
    }; 

    return (
        <Form onFinish={formik.handleSubmit} layout="vertical">
            <DynamicForm formik={formik} type='about' desc={'blog'} mode="add" />
            <Form.Item label={t('image')} rules={[{ required: true, message: t('image_error') }]}>
                <Upload beforeUpload={() => false} onChange={onFileChange} fileList={fileList} multiple={false}>
                    <Button icon={<UploadOutlined />}>{t('select_file')}</Button>
                </Upload>
            </Form.Item>
            <FooterSubmit action={handleCancel} loading={loading} />
        </Form>
    );
};

export default AddBlog;
