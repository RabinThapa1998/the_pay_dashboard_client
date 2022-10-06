import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { NavLink, redirect, useNavigate, useLocation } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const Index = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  console.log('🚀 ~ file: index.tsx ~ line 16 ~ Index ~ path', pathname);
  const navigate = useNavigate();
  return (
    <Layout className='h-screen'>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className='flex flex-row justify-end'>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger text-white',
            onClick: () => setCollapsed(!collapsed),
          })}
        </div>
        <Menu
          theme='dark'
          mode='inline'
          // defaultSelectedKeys={['1']}
          selectedKeys={pathname === '/' ? ['1'] : pathname.match(/programs/) ? ['2'] : ['3']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Dashboard',
              onClick: () => navigate('/'),
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Programs',
              onClick: () => navigate('/programs'),
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Payments',
            },
          ]}
        />
      </Sider>
      <Layout
        className='site-layout'
        style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin 0.2s' }}
      >
        <Header
          className='site-layout-background'
          style={{
            padding: 0,
          }}
        ></Header>
        <Content className='site-layout-background h-full p-5 mt-5'>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Index;
