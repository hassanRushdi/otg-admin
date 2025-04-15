import { ConfigProvider } from 'antd'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Comp from './constants/Comp'
import General from './context/General'
import './style/App.scss'

function App() {
  function ProtectedRoutes({ children }) {
    let token = localStorage.getItem('token')
    if (!token) {
      return <Navigate to="/login" replace={true} />
    } else {
      return children;
    }
  }
  const root = createBrowserRouter([
    {
      path: '', element: <Comp.MainLayout />, children: [
        { index: true, element: <ProtectedRoutes><Comp.Home /></ProtectedRoutes> }, 
        { path: '/profile', element: <ProtectedRoutes><Comp.Profile /></ProtectedRoutes> },
        { path: '/newsletter', element: <ProtectedRoutes><Comp.Newsletter /></ProtectedRoutes> },
 
 
       

        {
          path: '/attendance', children: [
            { index: true, element: <ProtectedRoutes><Comp.AttendancePage /></ProtectedRoutes> }
          ]
        },
        {
          path: '/banner', children: [
            { index: true, element: <ProtectedRoutes><Comp.BannerPage /></ProtectedRoutes> }
          ]
        },
        {
          path: '/satisfaction-form', children: [
            { index: true, element: <ProtectedRoutes><Comp.SatisfactionPage /></ProtectedRoutes> }
          ]
        },

        {
          path: '/company', children: [
            { index: true, element: <ProtectedRoutes><Comp.CompanyPage /></ProtectedRoutes> }
          ]
        },

        {
          path: '/students', children: [
            { index: true, element: <ProtectedRoutes><Comp.StudentsPage /></ProtectedRoutes> }
          ]
        },

        {
          path: '/course', children: [
            { index: true, element: <ProtectedRoutes><Comp.CoursePage /></ProtectedRoutes> }
          ]
        },

        {
          path: '/program', children: [
            { index: true, element: <ProtectedRoutes><Comp.ProgramsPage /></ProtectedRoutes> },  
           ]
        },

        {
          path: '/students-questions', children: [
            { index: true, element: <ProtectedRoutes><Comp.QuestionsPage /></ProtectedRoutes> },  
           ]
        },
        {
          path: '/questions-bank', children: [
            { index: true, element: <ProtectedRoutes><Comp.QuestionsBankPage /></ProtectedRoutes> },  
           ]
        },

        {
          path: '/exam', children: [
            { index: true, element: <ProtectedRoutes><Comp.ExamPage /></ProtectedRoutes> },  
           ]
        },
        
       
        {
          path: '*', element: <h1>Error</h1>
        }
      ],
    },
    {
      path: '/login', element: <Comp.Auth />, children: [
        { index: true, element: <Comp.Login /> },
      ]
    },
  ])
  const theme = {
    token: {
      colorPrimary: '#2e3192',
      colorActiveText: 'red' 
    },
    components: {
      Button: { colorPrimary: '#2e3192' },
      Input: { colorPrimary: '#2e3192' },
      Tabs: { colorPrimary: '#2e3192' },
      Checkbox: { colorPrimary: '#2e3192' },
      SideBar: { colorPrimary: '#2e3192' },
      Dropdown: { colorPrimary: '#2e3192' },
       

    },
  };

  return (
    <>
      <ConfigProvider theme={theme} >
        <General>
          <RouterProvider router={root} />
        </General>
      </ConfigProvider>
    </>
  )
}

export default App
