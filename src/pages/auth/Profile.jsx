import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Spin, Upload } from 'antd';
import { Field, Formik, Form as FormikForm } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import {
    fetchProfile,
    updatePassword,
    updateProfile
} from './Services/AuthService';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    let { t } = useTranslation();

    const getData = async () => { 
        setLoading(true);
        const { data } = await fetchProfile();
        setProfileData(data); 
        setLoading(false);
    };

    useEffect(() => { 
        getData();
    }, []);

    const handleProfileUpdate = async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        try {
            await updateProfile(formData);
            message.success(t('profile_updated_successfully'));
        } catch (error) {
            message.error(t('failed_to_update_profile'));
        }
    };

    const handlePasswordUpdate = async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        try {
            await updatePassword(formData);
            message.success(t('password_updated_successfully'));
        } catch (error) {
            message.error(t('failed_to_update_password'));
        }
    };

    if (loading) {
        return <Spin spinning={loading} />;
    }

    return (
        <div>
            <h2 className="mb-5">{t('profile')}</h2>
            <Formik
                initialValues={{
                    name: profileData.name || '',
                    email: profileData.email || '',
                }}
                onSubmit={handleProfileUpdate}
            >
                {({ setFieldValue }) => (
                    <FormikForm>
                        <Form.Item label={t('profile')}>
                            <Field name="name" as={Input} />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Field name="email" as={Input} />
                        </Form.Item>
                        <Form.Item label={t('upload')}>
                            <Upload
                                beforeUpload={(file) => { 
                                    return false;
                                }}
                                multiple={false}
                            >
                                <Button icon={<UploadOutlined />}>{t('upload')}</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" className='px-6' htmlType="submit">
                                {t('save')}
                            </Button>
                        </Form.Item>
                    </FormikForm>
                )}
            </Formik>

            <h2 className="mb-5">{t('change_password')}</h2>
            <Formik
                initialValues={{
                    old_password: '',
                    new_password: '',
                    password_confirmation: '',
                }}
                validationSchema={Yup.object({
                    old_password: Yup.string().required(t('required')),
                    new_password: Yup.string().required(t('required')),
                    password_confirmation: Yup.string()
                        .oneOf([Yup.ref('new_password'), null], t('password_must_match'))
                        .required(t('required')),
                })}
                onSubmit={handlePasswordUpdate}
            >
                <FormikForm>
                    <Form.Item label={t('old_password')}>
                        <Field name="old_password" type="password" as={Input} />
                    </Form.Item>
                    <Form.Item label={t('new_password')}>
                        <Field name="new_password" type="password" as={Input} />
                    </Form.Item>
                    <Form.Item label={t('confirm_new_password')}>
                        <Field name="password_confirmation" type="password" as={Input} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {t('save')}
                        </Button>
                    </Form.Item>
                </FormikForm>
            </Formik>  
        </div>
    );
};

export default Profile;
