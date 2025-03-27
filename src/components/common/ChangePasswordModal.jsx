import { LockOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { changeStudentPassword } from "src/api/students/studentsAPI";

const ChangePasswordModal = ({ student }) => {
  const [visible, setVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Store error message

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      setErrorMessage("Please enter both current and new passwords.");
      return;
    }

    setLoading(true);
    try {
      const response = await changeStudentPassword(student.student_id, currentPassword, newPassword);
      setLoading(false);

      if (response.success) {
        message.success(response.message);
        setVisible(false);
        setCurrentPassword("");
        setNewPassword("");
        setErrorMessage(""); 
      } else {
        setErrorMessage(response.message); 
      }
    } catch (error) {
      console.error("Error while changing password:", error);
      setErrorMessage("Something went wrong. Try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <div
      borderless
        icon={<LockOutlined />}
        onClick={() => setVisible(true)}
      >
        Change Password
      </div>

      <Modal
        title={`Change Password for ${student.name}`}
        open={visible}
        onCancel={() => {
          setVisible(false);
          setErrorMessage(""); 
        }}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleChangePassword}>
            Change Password
          </Button>,
        ]}
      >
        <Input.Password
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mb-2"
        />
        <Input.Password
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mb-2"
        />

        {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
