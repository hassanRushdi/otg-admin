import React, { useState } from 'react';
import { Table, Form, Input, Radio, Space, Card, Select, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const initialQuestions = [
  {
    id: 1,
    questionText: 'What is React?',
    correctAnswerId: 0,
    choices: ['Library', 'Framework', 'Language', 'Tool']
  },
  {
    id: 2,
    questionText: 'Which company maintains React?',
    correctAnswerId: 2,
    choices: ['Google', 'Microsoft', 'Meta', 'Amazon']
  }
];

const QuestionsBankPage = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [form] = Form.useForm();
  const [choices, setChoices] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [tableWidth, setTableWidth] = useState('100%');

  const handleAddQuestion = (values) => {
    const choicesArray = Object.values(values)
      .filter((_, key) => key.startsWith('choice'))
      .filter(Boolean);
    
    const correctAnswerId = choicesArray.findIndex(choice => choice === values.correctAnswer);
    const newQuestion = {
      id: questions.length + 1,
      questionText: values.questionText,
      correctAnswerId,
      choices: choicesArray,
    };
    setQuestions([...questions, newQuestion]);
    setChoices({});
    form.resetFields();
    setShowForm(false);
  };

  const handleChoiceChange = () => {
    const currentValues = form.getFieldsValue();
    const choiceValues = {};
    for (let i = 1; i <= 4; i++) {
      if (currentValues[`choice${i}`]) {
        choiceValues[`choice${i}`] = currentValues[`choice${i}`];
      }
    }
    setChoices(choiceValues);
  };

  const handleAnswerChange = (questionId, answerIndex) => {
    setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, correctAnswerId: answerIndex } : q));
  };

  const columns = [
    {
      title: 'Question',
      dataIndex: 'questionText',
    },
    {
      title: 'Options',
      render: (_, record) => (
        <Card size="small" style={{ background: '#f9f9f9' }}>
          <Radio.Group
            value={record.correctAnswerId}
            onChange={(e) => handleAnswerChange(record.id, e.target.value)}
          >
            <Space direction="vertical">
              {record.choices.map((choice, index) => (
                <Radio key={index} value={index}>
                  {choice}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Card>
      ),
    }
  ];

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table
        dataSource={questions}
        columns={columns}
        rowKey="id"
        pagination={false}
        style={{ marginBottom: 0 }}
        scroll={{ x: true }}
      />

      <div style={{ 
        width: '100%',
        border: '1px dashed #d9d9d9',
        borderRadius: '2px',
        marginBottom: 16
      }}>
        {!showForm ? (
          <Button 
            type="dashed" 
            icon={<PlusOutlined />} 
            onClick={() => setShowForm(true)}
            style={{ 
              width: '100%',
              height: 40,
              border: 'none'
            }}
          >
            Add Question
          </Button>
        ) : (
          <Card 
            size="small" 
            style={{ 
              border: 'none',
              borderRadius: 0,
              boxShadow: 'none'
            }}
          >
            <Form
              form={form}
              layout="inline"
              onFinish={handleAddQuestion}
              onValuesChange={handleChoiceChange}
            >
              <Row gutter={8} style={{ width: '100%' }}>
                <Col flex="auto">
                  <Form.Item 
                    name="questionText"
                    style={{ marginBottom: 8, width: '100%' }}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Question" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={8} style={{ width: '100%' }}>
                {[1, 2, 3, 4].map(num => (
                  <Col key={num} xs={24} sm={12} md={6}>
                    <Form.Item 
                      name={`choice${num}`}
                      style={{ marginBottom: 8 }}
                      rules={[{ required: num <= 2 }]}
                    >
                      <Input placeholder={`Option ${num}`} />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
              
              <Row gutter={8} style={{ width: '100%' }}>
                <Col xs={24} sm={12}>
                  <Form.Item 
                    name="correctAnswer"
                    style={{ marginBottom: 8, width: '100%' }}
                    rules={[{ required: true }]}
                  >
                    <Select 
                      placeholder="Correct answer" 
                      style={{ width: '100%' }}
                      options={Object.entries(choices).map(([key, value]) => ({
                        value,
                        label: `${key.replace('choice', 'Option ')}: ${value}`
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                    Add
                  </Button>
                  <Button onClick={() => {
                    form.resetFields();
                    setShowForm(false);
                  }}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuestionsBankPage;