import { Button, Input, message, Modal, Form, Select } from 'antd';
import React, { useState } from 'react';
import { updateCompany } from 'src/api/company/companyAPI';

const EditCompanyModal = ({ company, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    company_id: company.company_id,
    user_id: company.user_id || 1,
    company_name: company.company_name,
    company_sector: company.company_sector || '',
    company_status: company.company_status ?? 1, // Ensure numeric value
    has_export_council: company.has_export_council || false,
    export_council: company.company_export_council || '',
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
    <Modal 
      title="Edit Company" 
      open={true} 
      onCancel={onClose} 
      onOk={handleSave}
      width={600}
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Company Name</label>
          <Input
            value={formData.company_name}
            onChange={(e) => setFormData({...formData, company_name: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block mb-1">Sector</label>
          <Input
            value={formData.company_sector}
            onChange={(e) => setFormData({...formData, company_sector: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block mb-1">Status</label>
          <Select
            value={formData.company_status}
            onChange={(value) => setFormData({...formData, company_status: value})}
            className="w-full"
          >
            <Select.Option value={1}>Active</Select.Option>
            <Select.Option value={0}>Inactive</Select.Option>
          </Select>
        </div>
        
        <div>
          <label className="block mb-1">Has Export Council</label>
          <Select
            value={formData.has_export_council}
            onChange={(value) => setFormData({...formData, has_export_council: value})}
            className="w-full"
          >
            <Select.Option value={true}>Yes</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
        </div>
        
        {formData.has_export_council && (
          <div>
            <label className="block mb-1">Export Council Details</label>
            <Input.TextArea
              value={formData.export_council}
              onChange={(e) => setFormData({...formData, export_council: e.target.value})}
              rows={3}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditCompanyModal;