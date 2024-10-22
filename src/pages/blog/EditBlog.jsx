import { DatePicker, Form } from 'antd';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import DynamicForm from '@components/common/DynamicForm';
import DynamicImage from '@components/common/DynamicImage';
import FooterSubmit from '@components/common/FooterSubmit';
import BreadcrumbComponent from '@components/common/NavPages';
import { header, showNotification } from '@utils/notification';
import moment from 'moment';

const EditBlog = () => {
  let { t } = useTranslation();
  let { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const fetchShowData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`, header);
      if (response.data.status === 200) {
        setData(response.data.data);
      } else {
        showNotification('error', 'Fetch Failed', 'Failed to fetch data.');
      }
    } catch (error) {
      showNotification('error', 'Fetch Error', 'An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    fetchShowData();
  }, []);

  const formik = useFormik({
    initialValues: {
      title_en: '',
      title_ar: '',
      description_en: '',
      description_ar: '',
      short_description_en: '',
      short_description_ar: '',
      date: null,
      image: null,
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      if (typeof values.image === 'string') {
        values.image = null;
      }
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/blogs/${id}/update`, values, header);
        if (response.status === 200) {
          setFileList([]);
          showNotification('success', 'Updated Successfully', 'Entry updated successfully.');
          navigate('/blogs');
        } else {
          showNotification('error', 'Update Failed', 'Failed to update entry.');
        }
      } catch (error) {
        const errorMessages = error.response?.data?.errors && Object.values(error.response.data.errors).flat();
        errorMessages.forEach((errMsg) => showNotification('error', 'Handle error', errMsg));
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        title_en: data.title_en || '',
        title_ar: data.title_ar || '',
        description_en: data.description_en || '',
        description_ar: data.description_ar || '',
        short_description_en: data.short_description_en || '',
        short_description_ar: data.short_description_ar || '',
        date: data.date ? moment(data.date, 'YYYY-MM-DD') : null,
        image: data.image || null,
      });
      if (data.image) {
        setFileList([{ url: `${data.image}` }]);
      }
    }
  }, [data]);

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const filesToSend = newFileList.map(file => file.originFileObj).filter(file => !!file);
    formik.setFieldValue('image', filesToSend[0] || null);
  };

  const breadcrumbItems = [
    { path: '/', label: t('home') },
    { path: '/blogs', label: t('blog') },
    { path: `/blogs/edit/${id}`, label: t('update') },
  ];

  const handleChange = (date) => {
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD');
      formik.setFieldValue('date', formattedDate); // احفظ التاريخ بتنسيق YYYY-MM-DD
    } else {
      formik.setFieldValue('date', null); // إذا لم يتم اختيار تاريخ، اجعل القيمة فارغة
    }
  };

  return (
    <>
      <BreadcrumbComponent items={breadcrumbItems} />
      <Form onFinish={formik.handleSubmit} layout="vertical">
        <DynamicForm desc={'blog'} formik={formik} type='about' mode="update" />
        <Form.Item
          label={t('date_label')}
          rules={[{ required: true, message: t('date_error') }]}
        >
          <DatePicker
            name="date"
            defaultValue={formik.values.date ? moment(formik.values.date, 'YYYY-MM-DD') : null} // استخدام value بدلاً من defaultValue
            onChange={handleChange}
            onBlur={formik.handleBlur}
            className='w-full'
          />
        </Form.Item>

        <DynamicImage onFileChange={onFileChange} fileList={fileList} />
        <FooterSubmit loading={loading} path={'/blogs'} />
      </Form>
    </>
  );
};

export default EditBlog;
