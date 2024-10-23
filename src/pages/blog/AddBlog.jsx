import { UploadOutlined } from '@ant-design/icons';
import DynamicForm from '@components/common/DynamicForm';
import FooterSubmit from '@components/common/FooterSubmit';
import BreadcrumbComponent from '@components/common/NavPages';
import { header, showNotification } from '@utils/notification';
import { Button, DatePicker, Form, Upload, message } from 'antd';
import axios from 'axios';
import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const AddBlog = ({ onSuccess, handleCancel }) => {
    let { t } = useTranslation();
    const [fileList, setFileList] = useState([]);
    const [coverList, setCoverList] = useState([]); // New state for cover
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate()

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
            image: '',
            cover: '', // New field for cover
        },
        onSubmit: async (values) => {
            const params = new URLSearchParams({
                title: values.title,
                title_ar: values.title_ar,
                short: values.short,
                short_ar: values.short_ar,
                details: values.details,
                details_ar: values.details_ar,
                category: values.category,
                category_ar: values.category_ar,
                image: values.image, // Pass the image file name or URL
                cover: values.cover // Pass the cover file name or URL
            });

            setLoading(true)
            // Make the POST request 
            let { data } = await axios.post(`https://vigtas.live/otgweb/blog?${params.toString()}`)
            if (data?.status) {
                showNotification('success', '  Successfull', data?.msg);
                setTimeout(() => {
                    setLoading(false)
                    navigate('/blogs')
                }, 1500);
            } else {
                setLoading(false)
                showNotification('error', 'Add Failed', data.msg);

            }
            console.log(data);

        },
    });

    const onFileChange = async ({ fileList }) => {
        if (fileList.length > 1) {
            message.warning('You can only upload one file.');
            fileList = await [fileList[fileList.length - 1]];
        }
        setFileList(fileList);

        let { data } = await axios.post(`https://vigtas.live/uploader/uploads`, { file: fileList[0]?.originFileObj }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data);
        formik.setFieldValue('image', data);
    };

    const onCoverChange = async ({ fileList }) => { // New handler for cover upload
        if (fileList.length > 1) {
            message.warning('You can only upload one cover.');
            fileList = await [fileList[fileList.length - 1]];
        }
        setCoverList(fileList);

        let { data } = await axios.post(`https://vigtas.live/uploader/uploads`, { file: fileList[0]?.originFileObj }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data);
        formik.setFieldValue('cover', data);
    };
    const breadcrumbItems = [
        { path: '/', label: t('home') },
        { path: '/blogs', label: t('blog') },
        { path: `/blogs/add`, label: t('add') },
    ];

    return (
        <>
            <BreadcrumbComponent items={breadcrumbItems} />

            <Form onFinish={formik.handleSubmit} layout="vertical">
                <DynamicForm formik={formik} type='about' desc={'blog'} mode="add" />

                <Form.Item label={t('image')} rules={[{ required: true, message: t('image_error') }]}>
                    <Upload beforeUpload={() => false} onChange={onFileChange} fileList={fileList} multiple={false}>
                        <Button icon={<UploadOutlined />}>{t('select_file')}</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label={t('cover')} rules={[{ required: true, message: t('cover_error') }]}>
                    <Upload beforeUpload={() => false} onChange={onCoverChange} fileList={coverList} multiple={false}>
                        <Button icon={<UploadOutlined />}>{t('select_cover')}</Button>
                    </Upload>
                </Form.Item>

                <FooterSubmit action={handleCancel} loading={loading} />
            </Form>
        </>
    );
};

export default AddBlog;

