import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography, notification } from 'antd';
import { authServices } from 'services';
import './Home.scss';

// Component Home: Render home page
const Home = props => {
  const { Title } = Typography;

  // Handle logout
  const logout = params => {
    authServices.logout(params).then(res => {
      const { code, message } = res.data;
      if (code === 'SUCCESS') {
        notification.success({
          message: 'Thành công',
          description: message,
        });
        props.history.push('/login');
      } else {
        notification.error({
          message: 'Có lỗi',
          description: message,
        });
      }
    });
  };

  return (
    <div className="Home">
      <Row>
        <Col span={24}>
          <Title level={4}>
            Chào mừng bạn đến với hệ thống quản lý người dùng!
          </Title>
          <div>
            <Button id="go-to-change-password-btn" type="primary">
              <Link to="/change_password">Đổi mật khẩu</Link>
            </Button>
            <Button id="logout-btn" type="primary" onClick={() => logout()}>
              Đăng xuất
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
