import React, { useEffect, useState } from "react";
import { Modal, Button, Input, message, Upload } from "antd";
import { editStudentData } from "src/api/students/studentsAPI";
import { uploadImage } from "src/api/uploader/uploadImage";
import { UploadOutlined } from "@ant-design/icons";
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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        full_name: student.name || "",
        title: student.student_title || "",
        phone_number: student.phone_number || "",
        email: student.email || "",
        image: student.image || student.student_image || null,
      });
      
      if (student.image || student.student_image) {
        setImagePreview(student.image || student.student_image);
      }
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (info) => {
    if (info.file) {
      setImageFile(info.file.originFileObj);
      
      if (info.file.originFileObj) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(info.file.originFileObj);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    let imagePath = student.image || student.student_image || null; 
  
    try {
      console.log('Image file to upload:', imageFile);
      
      if (imageFile) {
        console.log('Starting image upload...');
        const uploadedPath = await uploadImage(imageFile);
        console.log('Upload response:', uploadedPath);
        
        if (!uploadedPath) {
          throw new Error('Image upload failed - no path returned');
        }
        imagePath = uploadedPath;
      } else {
        console.log('No new image to upload, keeping existing image:', imagePath);
      }

      const updatedData = {
        full_name: formData.full_name,
        title: formData.title,
        phone_number: formData.phone_number,
        email: formData.email,
        student_image: imagePath,
      };

      console.log('Data being sent to API:', updatedData);

      const success = await editStudentData(student.student_id, updatedData);
      
    if (!success) {
      throw new Error('API returned failure status');
    }

    message.success("Student updated successfully!");
    setVisible(false);
    onUpdate();
  } catch (error) {
    console.error('Update error:', error);
    message.error(error.message || "Update failed. Check console for details.");
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

  const openModal = () => {
    setVisible(true);
  };

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
            name="image"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false} // Prevent auto-upload
            onChange={handleImageChange}
          >
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              uploadButton
            )}
          </Upload>
          {imagePreview && (
            <Button 
              onClick={() => {
                setImagePreview(null);
                setImageFile(null);
              }}
              style={{ marginTop: 8 }}
            >
              Remove Image
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default EditStudentModal;
