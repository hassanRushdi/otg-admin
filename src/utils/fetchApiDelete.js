import axios from 'axios';
import { header, showNotification } from './notification';
import { Modal } from 'antd';


export const handleDelete = (record, navigate, fetchData, endpoint, t) => info(record, fetchData, endpoint, t)

export const info = (record, fetchData, endpoint, t) => {
    Modal.confirm({
        title: t('confirm_delete_title'), 
        centered: true,
        okButtonProps: {
            className: 'custom-modal-button'
        },
        okText: t('delete'),
        cancelText: t('cancel'),
        onOk() {
            handleDeleteConfirm(record, fetchData, endpoint);
        },
    });
};


export const handleDeleteConfirm = async (record, fetchData, endpoint) => {
    try {
        let { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/${endpoint}/${record.id}`, header);
        showNotification('success', 'Delete Successful', data?.message);
        fetchData()
    } catch (error) {
        showNotification('error', 'Delete Error', 'An error occurred while deleting the record.');
    }
};