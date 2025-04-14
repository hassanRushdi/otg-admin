import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import { fetchAllExams, addExam } from "src/api/exam/examAPI";
import AddExamForm from "./AddExamForm";
import { examColumns } from "./Columns";

const ExamPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addExamModalOpen, setAddExamModalOpen] = useState(false);

  const loadExams = async () => {
    try {
      const data = await fetchAllExams();
      setExams(data);
    } catch (error) {
      message.error("Failed to fetch exams");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleAddExam = () => {
    setAddExamModalOpen(true);
  };

  const handleExamAdded = async (examData) => {
    try {
      await addExam(examData);
      message.success("Exam added successfully!");
      setAddExamModalOpen(false);
      loadExams();
    } catch (error) {
      message.error("Failed to add exam");
      console.error("Error adding exam:", error);
    }
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={handleAddExam}
      >
        Add Exam
      </Button>

      <Table
        dataSource={exams}
        columns={examColumns}
        rowKey="exam_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        open={addExamModalOpen}
        title="Add New Exam"
        onCancel={() => setAddExamModalOpen(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <AddExamForm
          onClose={() => setAddExamModalOpen(false)}
          onExamAdded={handleExamAdded}
        />
      </Modal>
    </>
  );
};

export default ExamPage;