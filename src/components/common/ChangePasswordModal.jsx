import { LockOutlined } from '@ant-design/icons'
import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'

const ChangePasswordModal = () => {
    const [visible, setVisible] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false)
  return (
    <>
      <Button type="primary" icon={<LockOutlined />} onClick={() => setVisible(true)}>
        Change Password
      </Button>

      <Modal
        title={`Change Password for `}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} >
            Change Password
          </Button>,
        ]}
      >
        <Input.Password
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Modal>
    </>
  )
}

export default ChangePasswordModal