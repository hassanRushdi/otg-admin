import React, { useState } from "react";
import { Modal, Button, Input, message } from "antd";
import { editStudentData } from "src/api/students/studentsAPI";

const EditStudentModal = ({ student, onUpdate }) => {

    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
      full_name: student.name || "",
      title: student.student_title || "",
      phone_number: student.phone_number || "",
      email: student.email || "",
      image: null,
    });
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      setFormData({
        ...formData,
        [name]: type === "file" ? files[0] : value,
      });
    };
  
    const handleSubmit = async () => {
      setLoading(true);
      const success = await editStudentData(student.student_id, formData);
      setLoading(false);
  
      if (success) {
        message.success("Student updated successfully!");
        setVisible(false);
        onUpdate(); // Refresh students list
      } else {
        message.error("Failed to update student.");
      }
    };


  return (
     <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Edit Student
      </Button>

      <Modal
        title="Edit Student Details"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
            Save Changes
          </Button>,
        ]}
      >
        <Input name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} className="mb-2" />
        <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="mb-2" />
        <Input name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} className="mb-2" />
        <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="mb-2" />
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="mb-2" />
      </Modal>
    </>
  )
}

export default EditStudentModal