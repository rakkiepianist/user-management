import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button,
  Typography,
  notification,
} from 'antd';
import { authServices } from 'services';
import './ForgotPassword.scss';

// Component ForgotPassword: Render forgot password page
const ForgotPassword = props => {
  const { Title } = Typography;
  const { form } = props;
  const { getFieldDecorator } = form;

  // Handle forgot password
  const forgotPassword = params => {
    authServices.forgotPassword(params).then(res => {
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

  // Handle submit forgot password form
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) forgotPassword(values);
    });
  };

  return (
    <div className="ForgotPassword">
      <Row>
        <Col span={6} offset={9}>
          <Title level={3}>Quên mật khẩu</Title>
          <Form id="forgot-password-form" onSubmit={handleSubmit}>
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
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Email không đúng định dạng!',
                  },
                  {
                    required: true,
                    message: 'Vui lòng điền vào địa chỉ Email!',
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Địa chỉ Email"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="forgot-password-form-button"
              >
                Reset mật khẩu
              </Button>
              Đã có tài khoản? <Link to="/login">Đăng nhập!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Form.create()(ForgotPassword);
