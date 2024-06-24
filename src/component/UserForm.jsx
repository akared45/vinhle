import React from 'react';
import { Form, Input, Button } from 'antd';
import { validateFirstName, validateLastName, validateUsername, validateEmail, validatePassword } from './validationUtils';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UserForm = ({ form, onFinish, onFinishFailed }) => {
  return (
    <Form
      {...layout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="small"
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          { required: true, message: 'Please input your first name!' },
          { validator: (_, value) => validateFirstName(value) ? Promise.resolve() : Promise.reject('First Name is invalid!') }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          { required: true, message: 'Please input your last name!' },
          { validator: (_, value) => validateLastName(value) ? Promise.resolve() : Promise.reject('Last Name is invalid!') }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!', type: 'email' },
          { validator: (_, value) => validateEmail(value) ? Promise.resolve() : Promise.reject('Email is invalid!') }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: 'Please input your username!' },
          { validator: (_, value) => validateUsername(value) ? Promise.resolve() : Promise.reject('Username is invalid!') }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { validator: (_, value) => validatePassword(value) ? Promise.resolve() : Promise.reject('Password is invalid!') }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
