import axios from 'axios';
import { header, showNotification } from './notification';

const createFormikConfig = (initialValues, setLoading, setFileList, onSuccess, handleCancel, endpoint, fileListImages, navigate) => {
    return {
        initialValues,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setLoading(true); 


            try {
                // Create a FormData object
                const formData = new FormData(); 
                // Append regular fields to formData, except 'scopes'
                for (const key in values) {
                    if (key !== 'scopes' && values[key] !== null && values[key] !== undefined) {
                        formData.append(key, values[key]);
                    }
                }

                // Append images collection to formData
                fileListImages.forEach((file, index) => {
                    formData.append(`images[${index}]`, file.originFileObj);
                });

                // Append individual scopes fields, not the 'scopes' object itself
                if (values.scopes && values.scopes.length > 0) {
                    values.scopes.forEach((scope, index) => {
                        if (scope.en) {
                            formData.append(`scopes[${index}][en]`, scope.en);
                        }
                        if (scope.ar) {
                            formData.append(`scopes[${index}][ar]`, scope.ar);
                        }
                    });
                }
 

                // Send the FormData
                const { data } = await axios.post(`https://moon.rightclick.com.sa/api/admin/${endpoint}`, formData, header);

                if (data.status === 200) { 
                    navigate('/projects');
                    resetForm();
                    setFileList([]);
                    setImagesList([]);
                    onSuccess();
                    handleCancel();
                    showNotification('success', 'Added Successfully', 'New entry added successfully.');
                } else {
                    showNotification('error', 'Add Failed', 'Failed to add new entry.');
                }
              } finally {
                setLoading(false);
                setSubmitting(false);
            }
        }

    };
};

export default createFormikConfig;
