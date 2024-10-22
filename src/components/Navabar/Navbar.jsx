import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Dropdown, Layout, Menu, Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Lang from "../../assets/svg/lang.svg?react";
import { GeneralData } from '../../context/General';
const { Header } = Layout;
import '../style.scss'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

    const { collapsed, setCollapsed, visible, setVisible } = useContext(GeneralData);
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    useEffect(() => {
        const currentLang = i18n.language;
        const html = document.documentElement;
        html.setAttribute('lang', currentLang);
        html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    }, [i18n.language]);

    const languageMenu = (
        <Menu onClick={({ key }) => changeLanguage(key)}>
            <Menu.Item key="en">English</Menu.Item>
            <Menu.Item key="ar">العربية</Menu.Item>
        </Menu>
    );
    function logOut() {
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        navigate('/login');
    }
    function profilePAge() {
        navigate('/profile');
    }
    const userMenu = (
        <Menu>
            <Menu.Item onClick={() => profilePAge()} key="1" icon={<UserOutlined />}>{t('Profile')}</Menu.Item>
            <Menu.Item onClick={() => logOut()} key="1" icon={<LogoutOutlined />}>{t('LogOut')} </Menu.Item>
        </Menu>
    );
    return (
        <Header className='flex justify-content-between px-5 align-items-center site-layout-background' style={{ background: '#fff', padding: 0 }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => {
                    setCollapsed(!collapsed);
                    setVisible(!visible);
                }}
            />

            <Space size={16} wrap className='flex gap-5 justify-content-center align-items-center '>
                <Dropdown overlay={languageMenu} trigger={['hover']} placement="bottomRight">
                    <Lang style={{ width: 28, height: 28, cursor: 'pointer' }} className="bavbar_lang_btn" />
                </Dropdown>

                <Dropdown overlay={userMenu} trigger={['hover']} placement="bottomRight" >
                    <div className="navbar_user_menu" dir="ltr">
                        <Avatar
                            style={{
                                backgroundColor: '#f137373f',
                                color: '#f56a00',
                                cursor: 'pointer',
                            }}
                        >
                            {localStorage.getItem('name')?.charAt(0)}
                        </Avatar>
                        <span style={{ marginLeft: 8 }}>{localStorage.getItem('name')}</span>
                    </div>
                </Dropdown>
            </Space>
        </Header>
    );
};

export default Navbar;
