import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DynamicForm = ({ formik, type, mode, desc, type2, blog }) => {
    let { t } = useTranslation();
    // إعدادات شريط الأدوات
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Headers
        ['bold', 'italic', 'underline', 'strike'], // Text formatting
        [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
        [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript/Superscript
        [{ 'indent': '-1' }, { 'indent': '+1' }], // Indentation
        [{ 'direction': 'rtl' }], // Text direction
        [{ 'size': ['small', false, 'large', 'huge'] }], // Font sizes
        [{ 'color': ["#F13737", "#0D0715", "#cfced0", "#fff"] }, { 'background': [] }], // Text color and background color
        [{ 'align': [] }], // Text align
        ['link', 'image', 'video'], // Insert links, images, and videos
        ['clean'] // Remove formatting
    ];

    // إعدادات الوحدة المخصصة للصور
    const modules = {
        toolbar: toolbarOptions,
    };

    return (
        <Row gutter={50}>

            <Col xl={12} lg={12} xxl={12} md={12} sm={24} xs={24}>
                <Form.Item name={mode === 'add' ? "title" : undefined}
                    label={t('title_en_label')} rules={[{ required: true, message: t('title_en_error') }]}>
                    <Input
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Item>
            </Col>
            <Col xl={12} lg={12} xxl={12} md={12} sm={24} xs={24}>
                <Form.Item label={t('title_ar_label')}
                    name={mode === 'add' ? "title_ar" : undefined}
                    rules={[{ required: true, message: t('title_ar_error') }]}
                >
                    <Input
                        name="title_ar"
                        value={formik.values.title_ar}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Item>
            </Col>
            <Col xl={12} lg={12} xxl={12} md={24} sm={24} xs={24}>
                <Form.Item label={t('short_Desc_en_label')} name={mode === 'add' ? "short" : undefined}
                    rules={[{ required: true, message: t('short_Desc_en_label') }]} >
                    <Input.TextArea
                        name="short"
                        value={formik.values.short}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                </Form.Item>
            </Col>
            <Col xl={12} lg={12} xxl={12} md={12} sm={24} xs={24}>
                <Form.Item label={t('short_Desc_ar_label')} name={mode === 'add' ? "short_ar" : undefined}
                    rules={[{ required: true, message: t('short_Desc_ar_label') }]}>

                    <Input.TextArea
                        name="short_ar"
                        value={formik.values.short_ar}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                </Form.Item>
            </Col>
            <Col xl={24} lg={24} xxl={24} md={24} sm={24} xs={24} >
                <Form.Item label={t('Desc_en')} name={mode === 'add' ? "details" : undefined}
                    rules={[{ required: true, message: t('Desc_en') }]} >
                    <ReactQuill

                        style={{ height: '400px' }}
                        modules={modules}
                        value={formik.values.details}
                        onChange={(value) => formik.setFieldValue('details', value)}
                        onBlur={() => formik.setFieldTouched('details', true)}
                    />
                </Form.Item>
            </Col>
            <Col xl={24} lg={24} xxl={24} md={12} sm={24} xs={24} className='mt-5'>
                <Form.Item label={t('Desc_ar')} name={mode === 'add' ? "details_ar" : undefined}
                    rules={[{ required: true, message: t('Desc_ar') }]}>
                    <ReactQuill
                        style={{ height: '400px' }}

                        modules={modules}
                        value={formik.values.details_ar}
                        onChange={(value) => formik.setFieldValue('details_ar', value)}
                        onBlur={() => formik.setFieldTouched('details_ar', true)}
                    />
                </Form.Item>
            </Col>

            <Col xl={12} lg={12} xxl={12} md={12} sm={24} xs={24} className='mt-5'>
                <Form.Item name={mode === 'add' ? "category" : undefined}
                    label={t('category_name_en')} rules={[{ required: true, message: t('category_name_en') }]}>
                    <Input
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Item>
            </Col>
            <Col xl={12} lg={12} xxl={12} md={12} sm={24} xs={24}>
                <Form.Item label={t('category_name_ar')}
                    name={mode === 'add' ? "category_ar" : undefined}
                    rules={[{ required: true, message: t('category_name_ar') }]}
                >
                    <Input
                        name="category_ar"
                        value={formik.values.category_ar}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Item>
            </Col>




        </Row>
    )
}

export default DynamicForm