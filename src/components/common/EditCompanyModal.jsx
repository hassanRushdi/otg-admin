import { Button, Input, message, Modal } from 'antd';
import React, { useState } from 'react'
import { updateCompany } from 'src/api/company/companyAPI';

const EditCompanyModal = ({ company, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        company_id: company.company_id,
        company_name: company.company_name,
        company_sector: company.company_sector,
      });

      const handleSave = async () => {
        console.log("Submitting Company Data:", formData);  
      
        const success = await updateCompany(formData);
        if (success) {
          message.success("Company updated successfully!");
          onUpdate();
          onClose();
        } else {
          message.error("Failed to update company.");
        }
      };
    
  return (
    <Modal title="Edit Company" open={true} onCancel={onClose} footer={null}>
      <Input
        placeholder="Company Name"
        value={formData.company_name}
        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
        className="mb-2"
      />
      <Button type="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </Modal>
  )
}

export default EditCompanyModal