import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Icon, Input, Button, Typography } from 'antd';
import './ChangePassword.scss';

// Component ChangePassword: Render change password page
const ChangePassword = props => {
  const { Title } = Typography;
  const { form } = props;
  const { getFieldDecorator } = form;

  // Local state
  const [confirmDirty, setConfirmDirty] = useState(false);

  // Handle submit change password form
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
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
