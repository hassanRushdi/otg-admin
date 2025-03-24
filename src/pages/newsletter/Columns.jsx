
export const Columns = (showMessageModal,t ) => [
 
    {
        title: t('program title'),
        dataIndex: 'course_program_title',
        key: 'course_program_title',
        render: (text) => <div>{text}</div>, 
    },
    {
        description: t('program description'),
        dataIndex: 'course_program_description',
        key: 'course_program_description',
        render: (text) => <div>{text}</div>, 
    },
    {
        status: t('program status'),
        dataIndex: 'course_program_status',
        key: 'course_program_status',
        render: (text) => <div>{text}</div>, 
    },
    {
        status: t('thumbnail'),
        dataIndex: 'course_program_image',
        key: 'course_program_image',
        render: (text) => <div>{text}</div>, 
    }, 
];