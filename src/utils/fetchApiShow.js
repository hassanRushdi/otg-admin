// utils/apiUtils.js
import axios from 'axios';
import { header, showNotification } from './notification';

export const fetchApiShow = async (endpoint,  setData, setLoading) => {
    setLoading(true);
    try {
        let response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${endpoint}`); 
        if (response.status === 200) { 
            setData(response?.data?.data);
            return response?.data
        } else {
            showNotification('error', 'Fetch Failed', 'Failed to fetch data.');
        }
    } catch (error) {
        showNotification('error', 'Fetch Error', 'An error occurred while fetching data.');
    } finally {
        setLoading(false);
    }
};
export const fetchApiShow2 = async (endpoint, setData, setLoading) => {
    setLoading(true);
    try {
        let { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/${endpoint}`, header);
        setData(data?.data);
    } catch (error) {
        showNotification('error', 'Fetch Error', 'An error occurred while fetching data.');
    } finally {
        setLoading(false);
    }
};

export const fetchApiFooter = async (endpoint, setData, setLoading) => {
    setLoading(true);
    try {
        let response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${endpoint}`, header);
        if (response.status === 200) {
            const { data } = response.data;
            setData(data);
        } else {
            showNotification('error', 'Fetch Failed', 'Failed to fetch data.');
        }

    } catch (error) {
        showNotification('error', 'Fetch Error', 'An error occurred while fetching data.');
    } finally {
        setLoading(false);
    }
};

export const updateApiData = async (values, setLoading1) => {
    setLoading1(true)

    try {
        let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/settings/update-data`, values, header);
        if (response.status === 200) {
            setLoading1(false)
            showNotification('success', 'Updated Successfully', 'Data updated successfully.');
        } else {
            showNotification('error', 'Update Failed', 'Failed to update data.');
        }
        return response
    } catch (error) {
        showNotification('error', 'Update Error', 'An error occurred while updating data.');
        setLoading1(false)

    } finally {
        setLoading1(false)

    }
};