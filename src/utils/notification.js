// utils/notification.js
import { notification } from 'antd';

export const showNotification = (type, message, description, placement = 'bottomLeft') => {
    notification[type]({
        message: message,
        description: description,
        placement: placement
    });
};


export const header = {
    headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data', 
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
}