import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Space, Card, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const AddQuestionsForm = ({ examId, onClose, onSubmit  }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const payload = {
        exam_id: examId,
        questions: values.questions.map(q => ({
          question_en: q.question_en,
          marks: q.marks,
          answer_number: q.answer_number,
          answers: q.answers.map(a => ({ answer_en: a.answer_en }))
        }))
      };
      
      console.log("Final payload:", payload); 
      await onSubmit(payload);
    } catch (error) {
      message.error("Failed to submit questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card
                key={key}
                title={`Question ${name + 1}`}
                style={{ marginBottom: 16 }}
                extra={
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                }
              >
                <Form.Item
                  {...restField}
                  name={[name, 'question_en']}
                  label="Question"
                  rules={[{ required: true, message: 'Please input question!' }]}
                >
                  <Input.TextArea rows={2} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'marks']}
                  label="Marks"
                  rules={[{ required: true, message: 'Please input marks!' }]}
                >
                  <InputNumber min={1} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'answer_number']}
                  label="Correct Answer Number"
                  rules={[{ required: true, message: 'Please select correct answer!' }]}
                >
                  <InputNumber min={1} max={4} />
                </Form.Item>

                <Form.List name={[name, 'answers']}>
                  {(answerFields, { add: addAnswer, remove: removeAnswer }) => (
                    <>
                      {answerFields.map(({ key, name: answerName, ...answerRestField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item
                            {...answerRestField}
                            name={[answerName, 'answer_en']}
                            rules={[{ required: true, message: 'Please input answer!' }]}
                          >
                            <Input placeholder={`Answer ${answerName + 1}`} />
                          </Form.Item>
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeAnswer(answerName)}
                          />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => addAnswer()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Answer
                      </Button>
                    </>
                  )}
                </Form.List>
              </Card>
            ))}

            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
              style={{ marginBottom: 16 }}
            >
              Add Question
            </Button>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit Questions
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddQuestionsForm;