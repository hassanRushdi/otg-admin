import { useState } from "react";
import { Table, Input, Button, Modal, Form, Tabs, message } from "antd";

const StudentQuestions = () => {
  const [questions, setQuestions] = useState([
    { id: 1, student: "Ali", question: "What is React?", status: "Unread", date: "2025-03-25T12:00:00Z", answer: "" },
    { id: 2, student: "Sara", question: "How to use Hooks?", status: "Unread", date: "2025-03-26T10:00:00Z", answer: "" },
  ]);

  const [search, setSearch] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  const [activeTab, setActiveTab] = useState("unread");

  const handleSearch = (value) => setSearch(value);

  const handleReply = (question) => {
    setSelectedQuestion(question);
    setModalVisible(true);
    setAnswer("");
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim()) return message.error("Answer cannot be empty!");

    const currentTime = new Date().toISOString(); // Get the current time

    // Update the question status, answer, and update date
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === selectedQuestion.id ? { ...q, status: "Read", answer, date: currentTime } : q
      )
    );

    setModalVisible(false);
    setSelectedQuestion(null);
    setAnswer("");
    message.success("Answer submitted successfully!");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    });
  };

  const unreadColumns = [
    { title: "Student", dataIndex: "student", key: "student" },
    { title: "Question", dataIndex: "question", key: "question" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(b.date) - new Date(a.date),
      defaultSortOrder: "descend",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleReply(record)}>
          Reply
        </Button>
      ),
    },
  ];

  const readColumns = [
    { title: "Student", dataIndex: "student", key: "student" },
    { title: "Question", dataIndex: "question", key: "question" },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      render: (text) => <span style={{ color: "green" }}>{text}</span>,
    },
    {
      title: "Answered Date",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(b.date) - new Date(a.date),
    },
  ];

  return (
    <div>
      <Input.Search
        placeholder="Search questions..."
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 16 }}
      />

      {/* Tabs for Unread and Read Questions */}
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="Unread Questions" key="unread">
          <Table
            columns={unreadColumns}
            dataSource={questions
              .filter((q) => q.status === "Unread" && q.question.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) => new Date(b.date) - new Date(a.date))
            }
            rowKey="id"
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Read Questions" key="read">
          <Table
            columns={readColumns}
            dataSource={questions
              .filter((q) => q.status === "Read" && q.question.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) => new Date(b.date) - new Date(a.date))
            }
            rowKey="id"
          />
        </Tabs.TabPane>
      </Tabs>

      {/* Answer Modal */}
      <Modal
        title="Answer Question"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedQuestion(null);
          setAnswer("");
        }}
        onOk={handleSubmitAnswer}
      >
        {selectedQuestion && (
          <>
            <p><strong>Question:</strong> {selectedQuestion.question}</p>
            <Form layout="vertical">
              <Form.Item label="Your Answer">
                <Input.TextArea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </div>
  );
};

export default StudentQuestions;
