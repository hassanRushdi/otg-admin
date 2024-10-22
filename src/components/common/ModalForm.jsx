import { Modal } from 'antd'
import React from 'react'

const ModalForm = ({ title, body, handleCancel, isModalVisible }) => {
    return (
        <Modal width={'1000px'} title={title} centered visible={isModalVisible} onCancel={handleCancel} footer={null}>
            {body}
        </Modal>

    )
}

export default ModalForm
