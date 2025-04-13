import React, { useEffect, useState } from "react";
import { Modal, Button, Input, message, Upload } from "antd";
import { editStudentData } from "src/api/students/studentsAPI";
// import { uploadImage } from "src/api/uploader/uploadImage";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
;

const EditStudentModal = ({ student, onUpdate }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    title: "",
    phone_number: "",
    email: "",
    image: null,
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        full_name: student.name || "",
        title: student.student_title || "",
        phone_number: student.phone_number || "",
        email: student.email || "",
        
      });

      setImageUrl(student.student_image || null);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      console.log('Uploading file:', file.name, file.size);
  
      const response = await axios.post(
        'https://vigtas.co/uploader-1.0-SNAPSHOT/uploads', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformResponse: [data => data], 
        }
      );
  
      const filename = response.data.trim(); // Remove any newlines
      if (!filename) throw new Error('Empty filename returned');
      
      
      const fullUrl = `https://vigtas.co/uploader-1.0-SNAPSHOT/uploads/${filename}`;

      console.log(filename.fileName)
      
      console.log('Generated URL:', fullUrl);
      setImageUrl(fullUrl);
      message.success('Image uploaded successfully!');
      return fullUrl;
    } catch (error) {
      console.error('Upload failed:', error.response || error);
      message.error(`Upload failed: ${error.message}`);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (uploading) {
      message.warning('Please wait for image upload to complete');
      return;
    }
    setLoading(true);
  
    try {

      const updatedData = {
        full_name: formData.full_name,
        title: formData.title,
        phone_number: formData.phone_number,
        email: formData.email,
        student_image: imageUrl,
      };
      console.log('Submitting:', updatedData);

      const success = await editStudentData(student.student_id, updatedData);
      
      if (!success) throw new Error('Update failed');
      
      message.success("Student updated!");
      setVisible(false);
      onUpdate();
    } catch (error) {
      console.error('Error:', error);
      message.error(error.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload Photo</div>
    </div>
  );

  return (
    <>
      <div onClick={() => setVisible(true)}>
        Edit Student
      </div>

      <Modal
        title="Edit Student Details"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={loading} 
            onClick={handleSubmit}
          >
            Save Changes
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>Full Name:</label>
          <Input 
            name="full_name" 
            value={formData.full_name} 
            onChange={handleChange} 
            style={{ marginBottom: 16 }} 
          />
          
          <label style={{ display: 'block', marginBottom: 8 }}>Title:</label>
          <Input 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            style={{ marginBottom: 16 }} 
          />
          
          <label style={{ display: 'block', marginBottom: 8 }}>Phone Number:</label>
          <Input 
            name="phone_number" 
            value={formData.phone_number} 
            onChange={handleChange} 
            style={{ marginBottom: 16 }} 
          />
          
          <label style={{ display: 'block', marginBottom: 8 }}>Email:</label>
          <Input 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            style={{ marginBottom: 16 }} 
          />
          
          <label style={{ display: 'block', marginBottom: 8 }}>Profile Image:</label>
          <Upload
  accept="image/*"
  customRequest={async ({ file, onSuccess, onError }) => {
    try {
      const url = await handleImageUpload(file);
      onSuccess(url, file);
    } catch (error) {
      onError(error);
    }
  }}
  showUploadList={false}
>
  <Button icon={<UploadOutlined />} loading={uploading}>
    {uploading ? 'Uploading...' : 'Upload Photo'}
  </Button>
</Upload>

          {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Preview" 
            style={{ width: 100, marginTop: 10 }} 
          />
        )}
        </div>
      </Modal>
    </>
  );
};

export default EditStudentModal;
