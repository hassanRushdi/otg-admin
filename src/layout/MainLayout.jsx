import React, { useContext } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navabar/Navbar';
import { GeneralData } from '../context/General';
import Footers from './../components/Footer/Footer';
import SideBar from './../components/SideBar/SideBar';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;
import '../components/style.scss'

const MainLayout = () => {
  const { token: { borderRadiusLG } } = theme.useToken();
  let { isLang, collapsed, setCollapsed } = useContext(GeneralData);
  const { i18n } = useTranslation();

  return (
    <Layout>
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        className="site-layout"
        style={{
          [i18n.language === 'ar' ? 'marginRight' : 'marginLeft']: collapsed ? 60 : 200,  // Adjust the margin for the content area
          transition: 'margin 0.2s ease-in-out',
        }}
      >
        <Navbar />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
            background: '#fff',
            borderRadius: borderRadiusLG,
            overflow: 'initial'
          }}
        >
          <Outlet />
        </Content>
        <Footers />
      </Layout>
    </Layout>
  );
}

export default MainLayout;
