import React, { useEffect, useState } from "react";
import {
  Modal,
  Descriptions,
  Button,
  Spin,
  Collapse,
  Typography,
  Divider,
  List,
  Col,
  Row,
} from "antd";
import {
  DollarCircleOutlined,
  ScheduleOutlined,
  BranchesOutlined,
  CalendarOutlined,
  FilePdfOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AddChapterForm from "./chapters/AddChapterModal";
import AddModuleForm from "./modules/AddModuleForm";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const CourseDetailsModal = ({ open, onClose, course }) => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddChapterModalOpen, setAddChapterModalOpen] = useState(false);
  const [isAddModuleModalOpen, setAddModuleModalOpen] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://vigtas.co/lms/get-course-details/${course.course_id}`
      );
      setCourseDetails(response.data.course);
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCourseDetails();
    }
  }, [open]);

  if (loading) {
    return (
      <Modal
        title="Loading Course Details"
        open={open}
        onCancel={onClose}
        footer={null}
        closable={false}
        styles={{ textAlign: "center" }}
      >
        <Spin size="large" />
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      title={<Title level={3}>{course?.title_en}</Title>}
      onCancel={onClose}
      footer={null}
      width={800}
      styles={{ padding: "24px" }}
      closable={true}
    >
      {course && (
        <>
          <Text strong style={{ fontSize: "18px" }}>
            Course Information
          </Text>
          <Descriptions
            bordered
            column={1}
            size="large"
            style={{ marginBottom: "16px" }}
          >
            <Descriptions.Item label="Title">
              <Text strong>{course.title_en}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {course.description_en}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              <Text strong>
                <DollarCircleOutlined /> ${course.final_price}
                {course.has_discount && (
                  <Text
                    type="secondary"
                    style={{ marginLeft: 8, textDecoration: "line-through" }}
                  >
                    ${course.price}
                  </Text>
                )}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Duration">
              <Text>
                <ScheduleOutlined /> {course.duration}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Modules">
              <Text>
                <BranchesOutlined /> {course.total_number_of_modules}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Sessions">
              <Text>{course.number_of_sessions}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Allowed Absence Days">
              <Text>{course.allowed_absent_days}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Start Date">
              <Text>
                <CalendarOutlined /> {course.course_start_date}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Next Session">
              <Text>{course.next_course}</Text>
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Text strong style={{ fontSize: "18px" }}>
            Chapters
          </Text>

          <Collapse defaultActiveKey={["1"]} accordion>
            {courseDetails?.chapters?.map((chapter, index) => (
              <Panel key={index} header={<Text strong>{chapter.titleEn}</Text>}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text strong style={{ fontSize: "18px" }}>
                      Modules
                    </Text>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => {
                        setSelectedChapterId(chapter.chapterId);
                        setAddModuleModalOpen(true);
                      }}
                    >
                      Add Module
                    </Button>
                  </Col>
                </Row>

                <Collapse
                  defaultActiveKey={["1"]}
                  accordion
                  style={{ marginTop: 8 }}
                >
                  {chapter.modules.map((module) => (
                    <Panel
                      header={<Text strong>{module.titleEn}</Text>}
                      key={module.moduleId}
                    >
                      {/* <Text strong style={{ fontSize: "18px" }}>
                        Sessions
                      </Text>
                      <Collapse
                        defaultActiveKey={["1"]}
                        accordion
                        style={{ marginTop: 8 }}
                      >
                        {module.sessions.map((session) => (
                          <Panel
                            header={<Text strong>{session.titleEn}</Text>}
                            key={session.sessionId}
                          >
                            <Text>Start Time: {session.startTime}</Text>
                            <br />
                            <Text>End Time: {session.endTime}</Text>
                            <br />
                            <Text>Location: {session.addressEn}</Text>
                            <br />
                            <Text>
                              Link:{" "}
                              <a
                                href={session.microsoftTeamsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Join
                              </a>
                            </Text>
                          </Panel>
                        ))}
                      </Collapse> */}
                      <List
                        size="small"
                        header={<b>Content</b>}
                        dataSource={module.contents}
                        renderItem={(item) => (
                          <List.Item>
                            {item.materialType === 0 ? (
                              <>
                                <FilePdfOutlined
                                  style={{ color: "#d32029", marginRight: 8 }}
                                />
                                <a
                                  href={item.contentData}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View PDF
                                </a>
                              </>
                            ) : (
                              <>
                                <VideoCameraOutlined
                                  style={{ color: "#1890ff", marginRight: 8 }}
                                />
                                <a
                                  href={item.contentData}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Watch Video
                                </a>
                              </>
                            )}
                          </List.Item>
                        )}
                      />
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
            ))}
          </Collapse>
          <Button
            type="dashed"
            onClick={() => setAddChapterModalOpen(true)}
            style={{ marginTop: 16 }}
            block
          >
            + Add Chapter
          </Button>

          <AddChapterForm
            visible={isAddChapterModalOpen}
            onClose={() => setAddChapterModalOpen(false)}
            courseId={course.course_id}
            onChapterAdded={() => fetchCourseDetails()}
          />

          <AddModuleForm
            visible={isAddModuleModalOpen}
            onClose={() => {
              setAddModuleModalOpen(false);
              setSelectedChapterId(null);
            }}
            chapterId={selectedChapterId}
            onModuleAdded={fetchCourseDetails}
          />

          <Button
            onClick={onClose}
            type="primary"
            block
            style={{ marginTop: 24 }}
          >
            Close
          </Button>
        </>
      )}
    </Modal>
  );
};

export default CourseDetailsModal;
