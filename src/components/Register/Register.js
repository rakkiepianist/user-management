import React, { useState } from 'react';
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
import './Register.scss';

// Component Register: Render register page
const Register = props => {
  const { Title } = Typography;
  const { form } = props;
  const { getFieldDecorator } = form;

  // Local state
  const [confirmDirty, setConfirmDirty] = useState(false);

  // Handle register
  const register = params => {
    authServices.register(params).then(res => {
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

  // Handle submit register form
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) register(values);
    });
  };

  // Handle confirm password input blur
  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  // Compare next password to first password
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu và xác nhận mật khẩu không trùng khớp!');
    } else {
      callback();
    }
  };

  // Validate to next password
  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm_password'], { force: true });
    }
    callback();
  };

  return (
    <div className="Register">
      <Row>
        <Col span={6} offset={9}>
          <Title level={3}>Đăng ký tài khoản</Title>
          <Form id="register-form" onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng điền vào tên đăng nhập!',
                  },
                  {
                    min: 6,
                    message: 'Tên đăng nhập phải chứa ít nhất 6 ký tự!',
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
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng điền vào mật khẩu!',
                  },
                  {
                    min: 8,
                    message: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Mật khẩu"
                />,
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('confirm_password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng điền vào xác nhận mật khẩu!',
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Xác nhận mật khẩu"
                  onBlur={handleConfirmBlur}
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
                className="register-form-button"
              >
                Đăng ký
              </Button>
              Đã có tài khoản? <Link to="/login">Đăng nhập!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Form.create()(Register);
