import {
  AppstoreAddOutlined,
  CameraOutlined,
  DotChartOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  PieChartOutlined,
  SettingOutlined,
  ShopOutlined,
  EyeOutlined,
  ReadOutlined,
  SlidersOutlined,
  TrophyOutlined,
  TeamOutlined,
  BarChartOutlined,
  FileTextOutlined,
  PhoneOutlined,
  ProfileOutlined,
  ProjectOutlined,
  PictureOutlined,
  MailOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  BankOutlined,
  UserOutlined,
  BookOutlined,
  IdcardOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { Drawer, Layout, Menu } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, NavLink, useLocation } from 'react-router-dom'; // Import useLocation
import img from '../../constants/img';
import { GeneralData } from '../../context/General';
import '../style.scss';
import { useTranslation } from 'react-i18next';

const { Sider } = Layout;

function getItem(label, key, icon, children, path) {
  return {
    key,
    icon,
    children,
    label: path ? <NavLink to={path} activeClassName="active-link">{label}</NavLink> : label,
  };
}

const SideBar = ({ collapsed }) => {
  const { i18n, t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { setCollapsed, visible, setVisible } = useContext(GeneralData);
  const location = useLocation(); // Get the current URL location
  const [selectedKey, setSelectedKey] = useState('1');

  // Update selected key based on the current route
  useEffect(() => {
    setSelectedKey(location.pathname); // Set the current path as selectedKey
  }, [location.pathname]); // Re-run this effect when location changes

  const items = [
    // getItem(t('dashboard'), '/', <PieChartOutlined />, null, '/'),
    // getItem(t('blog'), '/blogs', <ReadOutlined />, null, '/blogs'),
    // getItem(t('contact'), '/contact-us', <PhoneOutlined />, null, '/contact-us'),
    // getItem(t('newsletter'), '/newsletter', <MailOutlined  />, null, '/newsletter'),
    
    // getItem(t('newsletter'), '/newsletter', <MailOutlined  />, null, '/newsletter'),   "Translation"
    // getItem((t('attendance')), '/attendance', <ScheduleOutlined />, null, '/attendance'),
    getItem((t('company')), '/company', <BankOutlined />, null, '/company'),
    getItem((t('course')), '/course', <ReadOutlined />, null, '/course'),
    getItem((t('program')), '/program', <BookOutlined />, null, '/program'),
    getItem((t('students')), '/students', <UserOutlined />, null, '/students'),
    getItem((t('attendance')), '/attendance', <IdcardOutlined />, null, '/attendance'),
    getItem((t('banner')), '/banner', <PictureOutlined />, null, '/banner'),
    getItem((t('data')), '/data', <DatabaseOutlined />, null, '/data'),
    getItem((t('students questions')), '/students-questions', <DatabaseOutlined />, null, '/students-questions'),

  ];

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <>
      {isMobile ? (
        <div>
          <Drawer
            title="Moon Light "
            placement="left"
            onClose={closeDrawer}
            visible={visible}
            bodyStyle={{ padding: 0 }}
            size='small'
          >
            <Menu
              theme="light"
              selectedKeys={[selectedKey]} // Set selected key for mobile view
              mode="inline"
              items={items}
            />
          </Drawer>
        </div>
      ) : (
        <Sider
          className="sider"
          style={{
            padding: 0,
            background: '#fff',
            position: 'fixed',
            height: '100vh',
            transition: 'width 0.2s ease-in-out',
            overflowY: 'scroll',
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={60}
          onCollapse={(collapse) => setCollapsed(collapse)}
        >
          <div className="demo-logo-vertical">
            <Link to={'/'}>
              <img src={!collapsed ? img.logoTrain : img.logoSmall} alt="" width={!collapsed ? 150 : 40} />
            </Link>
          </div>
          <Menu
            theme="light"
            selectedKeys={[selectedKey]} // Set selected key based on the path
            mode="inline"
            items={items}
          />
        </Sider>
      )}
    </>
  );
};

export default SideBar;
