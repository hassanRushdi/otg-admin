import { AddButton } from '@components/common/AddButton';
import ModalForm from '@components/common/ModalForm';
import { fetchApiShow } from '@utils/fetchApiShow';
import { Divider, Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddBlog from './AddBlog';
import { Columns } from './Columns'; // Adjust the path as needed

const BlogData = () => {
    let { t } = useTranslation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchData = () => {
        fetchApiShow('blog', setData, setLoading).then((item) => {
            setData(item);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const showModal = () => setIsModalVisible(true);

    const handleCancel = () => setIsModalVisible(false);

    const handleSuccess = () => {
        setIsModalVisible(false);
        fetchData();
    };

    // Memoizing the columns to avoid unnecessary re-renders
    const columns = useMemo(() => Columns(fetchData, t), [fetchData, t]);

    return (
        <>
            <AddButton path={'/blogs/add'} />
            <ModalForm
                title={t('title_blog_add')}
                body={
                    <div>
                        <Divider plain />
                        <AddBlog onSuccess={handleSuccess} handleCancel={handleCancel} />
                    </div>
                }
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
            />
            <Divider plain />
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="id"
                bordered={true}
                scroll={{ x: '100%' }}
            />
        </>
    );
};

export default BlogData;
