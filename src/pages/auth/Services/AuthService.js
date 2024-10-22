import axios from "axios";
import { header } from "../../../utils/notification";

// Validate From handel Login
export const handelLogin = async (values, setLoadUserName, navigate) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    setLoadUserName(true);
    let { data } = await axios.post(url, values).catch((err) => {
 
        setLoadUserName(false);
    })

    if (data.status === 200) {
        // localStorage.setItem('tockenClick', data?.data?.token)
        // localStorage.setItem('UserName', data?.data?.name)
        // localStorage.setItem('UserUserName', data?.data?.UserName)
        // localStorage.setItem('UserPhoto', data?.data?.image)
        setTimeout(() => {
          
            setLoadUserName(false);
            navigate('/')
        }, 3000);
        return { severity: 'success', summary: 'Success', detail: 'Your login has been successful' };

    } else if (data.status === 401) {
        setLoadUserName(false);
        return { severity: 'error', summary: 'Error', detail: data?.message };

    }

};
export const fetchProfile = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/profile`, header);

    return response.data;
};

export const updateProfile = async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/update-personal-data`, formData, header);
    return response.data;
};

export const updatePassword = async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/update-password`, formData, {
        headers: {
            ...header.headers,
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export default {
    handelLogin
};

