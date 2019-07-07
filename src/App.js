import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import Home from 'components/Home';
import Login from 'components/Login';
import Register from 'components/Register';
import ForgotPassword from 'components/ForgotPassword';
import ChangePassword from 'components/ChangePassword';
import './App.scss';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/login">Đăng nhập</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/register">Đăng ký</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Hệ thống quản lý người dùng</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/forgot_password" component={ForgotPassword} />
              <Route path="/change_password" component={ChangePassword} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
