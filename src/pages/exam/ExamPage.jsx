import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import { fetchAllExams, addExam, addQuestionsWithChoices } from "src/api/exam/examAPI";
import AddExamForm from "./AddExamForm";
import {examColumns} from "./Columns";
import AddQuestionsForm from "./AddQuestionsForm";

const ExamPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addExamModalOpen, setAddExamModalOpen] = useState(false);
  const [addQuestionsModalOpen, setAddQuestionsModalOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);

  const loadExams = async () => {
    try {
      setLoading(true);
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

  const handleAddQuestions = (examId) => {
    setSelectedExamId(examId);
    setAddQuestionsModalOpen(true);
  };

  const handleQuestionsAdded = async (questionsData) => {
    try {
      await addQuestionsWithChoices(selectedExamId, questionsData);
      message.success("Questions added successfully!");
      setAddQuestionsModalOpen(false);
    } catch (error) {
      console.error("Error details:", error.response?.data);
      message.error(error.message || "Failed to add questions");
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
        columns={examColumns(handleAddQuestions)}
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

      <Modal
        open={addQuestionsModalOpen}
        title={`Add Questions to Exam ${selectedExamId}`}
        onCancel={() => setAddQuestionsModalOpen(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <AddQuestionsForm
          examId={selectedExamId}
          onClose={() => setAddQuestionsModalOpen(false)}
          onSubmit={handleQuestionsAdded}
        />
      </Modal>
    </>
  );
};

export default ExamPage;