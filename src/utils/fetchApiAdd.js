import axios from 'axios';
import { header, showNotification } from './notification';
 
const createFormikConfig = (initialValues, setLoading, setFileList, onSuccess, handleCancel,endpoint) => {
    return {
        initialValues,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setLoading(true); 
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/${endpoint}`, values, header);

                if (response.status === 200) {
                    resetForm();
                    setFileList([]);
                    onSuccess();
                    handleCancel();
                    showNotification('success', 'Added Successfully', 'New entry added successfully.');
                } else {
                    showNotification('error', 'Add Failed', 'Failed to add new entry.');
                }
            } catch (error) {
                const errorMessages = error.response?.data?.errors ? Object.values(error.response.data.errors).flat() : ['An error occurred while adding new entry.'];
                errorMessages.forEach(errMsg => showNotification('error', 'Handle error', errMsg));
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        },
    };
};

export default createFormikConfig;
