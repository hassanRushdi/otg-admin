import dayjs from "dayjs";

export const courseColumns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (img) => <img src={img} alt="course" width={60} height={40} />,
  },
  {
    title: "Title (EN)",
    dataIndex: "title_en",
    key: "title_en",
  },
  {
    title: "Title (AR)",
    dataIndex: "title_ar",
    key: "title_ar",
  },
  {
    title: "Description (EN)",
    dataIndex: "description_en",
    key: "description_en",
  },
  {
    title: "Description (AR)",
    dataIndex: "description_ar",
    key: "description_ar",
  },
  {
    title: "Benefit",
    dataIndex: "benefit",
    key: "benefit",
  },
  {
    title: "Has Exam",
    dataIndex: "has_exam",
    key: "has_exam",
    render: (val) => (val ? "Yes" : "No"),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (val) => `$${val}`,
  },
  {
    title: "Has Discount",
    dataIndex: "has_discount",
    key: "has_discount",
    render: (val) => (val ? "Yes" : "No"),
  },
  {
    title: "Final Price",
    dataIndex: "final_price",
    key: "final_price",
    render: (val) => `$${val}`,
  },
  {
    title: "Hours",
    dataIndex: "hours",
    key: "hours",
  },
  {
    title: "Modules",
    dataIndex: "total_number_of_modules",
    key: "total_number_of_modules",
  },
  {
    title: "Sessions",
    dataIndex: "number_of_sessions",
    key: "number_of_sessions",
  },
  {
    title: "Duration (min)",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Course Status",
    dataIndex: "course_status",
    key: "course_status",
    render: (val) => {
      switch (val) {
        case 0:
          return "Upcoming";
        case 1:
          return "Ongoing";
        case 2:
          return "Completed";
        default:
          return "Unknown";
      }
    },
  },
  {
    title: "Next Course",
    dataIndex: "next_course",
    key: "next_course",
    render: (val) => dayjs(val).format("YYYY-MM-DD HH:mm"),
  },
  {
    title: "Start Date",
    dataIndex: "course_start_date",
    key: "course_start_date",
    render: (val) => dayjs(val).format("YYYY-MM-DD HH:mm"),
  },
  {
    title: "Allowed Absent Days",
    dataIndex: "allowed_absent_days",
    key: "allowed_absent_days",
  },
  {
    title: "Completion %",
    dataIndex: "complete_percentage",
    key: "complete_percentage",
    render: (val) => `${val}%`,
  },
];
