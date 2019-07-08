import React from 'react';
import { Row, Col, Typography } from 'antd';
import './Home.scss';

// Component Home: Render home page
const Home = () => {
  const { Title } = Typography;

  return (
    <div className="Home">
      <Row>
        <Col span={24}>
          <Title level={4}>
            Chào mừng bạn đến với hệ thống quản lý người dùng!
          </Title>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
