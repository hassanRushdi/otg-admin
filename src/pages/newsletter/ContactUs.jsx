import { Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchApiShow } from '../../utils/fetchApiShow';
import { Columns } from './Columns';

const Newsletter = () => {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState('');

    useEffect(() => {
        fetchApiShow('newsletter', setData, setLoading).then((item) => {
            setData(item);
        })
    }, []);



    const showMessageModal = (message) => {
        setSelectedMessage(message);
        setIsModalVisible2(true);
    };

    const handleModalOkShow = () => {
        setIsModalVisible2(false);
        setSelectedMessage('');
    };

    return (
        <>
            <Table
                columns={Columns(showMessageModal, t)}
                dataSource={data} 
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 8 }}
                bordered={true}
                scroll={{ x: '100%' }} // scroll افقي إذا احتاج الجدول
                size="middle" // استخدام حجم متوسط للجدول
                className="custom-table" // إضافة كلاس خاص لتنسيقات CSS
            />
            <Modal
                title={t('full_mess')}
                visible={isModalVisible2}
                onOk={handleModalOkShow}
                onCancel={handleModalOkShow}
                width="70%"
            >
                <div className='blog_details_data' dangerouslySetInnerHTML={{ __html: selectedMessage.replace(/\r\n|\n|\r/g, '<br>') }} />
            </Modal>
        </>
    );
};

export default Newsletter;