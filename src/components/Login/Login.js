import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Typography,
  notification,
} from 'antd';
import { authServices } from 'services';
import './Login.scss';

// Component Login: Render login page
const Login = props => {
  const { Title } = Typography;
  const { form } = props;
  const { getFieldDecorator } = form;

  // Handle login
  const login = params => {
    authServices.login(params).then(res => {
      const { code, message } = res.data;
      if (code === 'SUCCESS') {
        notification.success({
          message: 'Thành công',
          description: message,
        });
        props.history.push('/');
      } else {
        notification.error({
          message: 'Có lỗi',
          description: message,
        });
      }
    });
  };

  // Handle submit login form
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) login(values);
    });
  };

  return (
    <div className="Login">
      <Row>
        <Col span={6} offset={9}>
          <Title level={3}>Đăng nhập</Title>
          <Form id="login-form" onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng điền vào tên đăng nhập!',
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Tên đăng nhập"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Vui lòng điền vào mật khẩu!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Mật khẩu"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Nhớ tôi</Checkbox>)}
              <Link className="login-form-forgot" to="/forgot_password">
                Quên mật khẩu
              </Link>
              <Button
                id="login-btn"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng nhập
              </Button>
              Chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Form.create()(Login);
