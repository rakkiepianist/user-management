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
import './ChangePassword.scss';

// Component ChangePassword: Render change password page
const ChangePassword = props => {
  const { Title } = Typography;
  const { form } = props;
  const { getFieldDecorator } = form;

  // Handle change password
  const changePassword = params => {
    authServices.changePassword(params).then(res => {
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

  // Local state
  const [confirmDirty, setConfirmDirty] = useState(false);

  // Handle submit change password form
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) changePassword(values);
    });
  };

  // Handle confirm password input blur
  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  // Compare next password to first password
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('new_password')) {
      callback('Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp!');
    } else {
      callback();
    }
  };

  // Validate to next password
  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm_new_password'], { force: true });
    }
    callback();
  };

  return (
    <div className="ChangePassword">
      <Row>
        <Col span={6} offset={9}>
          <Title level={3}>Đổi mật khẩu mới</Title>
          <Form id="change-password-form" onSubmit={handleSubmit}>
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng điền vào mật khẩu hiện tại!',
                  },
                ],
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Mật khẩu hiện tại"
                />,
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('new_password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng điền vào mật khẩu mới!',
                  },
                  {
                    min: 8,
                    message: 'Mật khẩu mới phải chứa ít nhất 8 ký tự!',
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
                  placeholder="Mật khẩu mới"
                />,
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('confirm_new_password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng điền vào xác nhận mật khẩu mới!',
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
                  placeholder="Xác nhận mật khẩu mới"
                  onBlur={handleConfirmBlur}
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button
                id="change-password-btn"
                type="primary"
                htmlType="submit"
                className="change-password-form-button"
              >
                Đổi mật khẩu
              </Button>
              Quên mật khẩu hiện tại?{' '}
              <Link to="/forgot_password">Quên mật khẩu!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Form.create()(ChangePassword);
