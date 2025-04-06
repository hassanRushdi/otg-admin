export const courseColumns = [
    {
      title: "Course Name",
      dataIndex: "title_en",
      key: "title_en",
    },
    {
      title: "Has Exam",
      dataIndex: "has_exam",
      key: "has_exam",
      render: (hasExam) => (hasExam ? "Yes" : "No"),
    },
    {
      title: "Start Date",
      dataIndex: "course_start_date",
      key: "course_start_date",
    },
    {
      title: "Next Session",
      dataIndex: "next_course",
      key: "next_course",
    },
  ];
  