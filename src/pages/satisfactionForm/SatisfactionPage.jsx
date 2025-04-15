import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import { fetchSatisfactionForms, addSatisfactionForm } from "src/api/satisfaction/satisfactionAPI";
import { columns } from "./Columns";
import AddSatisfactionFormModal from "./AddSatisfactionFormModal";

const SatisfactionFormPage = ({ moduleId }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addFormModalOpen, setAddFormModalOpen] = useState(false);
  const [viewQuestionsModalOpen, setViewQuestionsModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  const loadForms = async () => {
    try {
      setLoading(true);
      const data = await fetchSatisfactionForms(moduleId);
      setForms(data);
    } catch (error) {
      message.error("Failed to fetch satisfaction forms");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadForms();
  }, [moduleId]);

  const handleAddForm = () => {
    setAddFormModalOpen(true);
  };

  const handleFormAdded = async (formData) => {
    try {
      await addSatisfactionForm({ ...formData, module_id: moduleId });
      message.success("Form added successfully!");
      setAddFormModalOpen(false);
      loadForms();
    } catch (error) {
      message.error("Failed to add form");
      console.error("Error adding form:", error);
    }
  };

  const handleViewQuestions = (form) => {
    setSelectedForm(form);
    setViewQuestionsModalOpen(true);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={handleAddForm}
      >
        Add Satisfaction Form
      </Button>

      <Table
        dataSource={forms}
        columns={columns(handleViewQuestions)}
        rowKey="form_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        open={addFormModalOpen}
        title="Add New Satisfaction Form"
        onCancel={() => setAddFormModalOpen(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <AddSatisfactionFormModal
          onClose={() => setAddFormModalOpen(false)}
          onSubmit={handleFormAdded}
          moduleId={moduleId}
        />
      </Modal>

      <Modal
        open={viewQuestionsModalOpen}
        title={`Questions for ${selectedForm?.form_name}`}
        onCancel={() => setViewQuestionsModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedForm?.questions?.map((q, index) => (
          <div key={q.form_question_id} style={{ marginBottom: 16 }}>
            <h4>
              {index + 1}. {q.question_text} ({q.question_type === 0 ? "Rating" : "Text"})
            </h4>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default SatisfactionFormPage;