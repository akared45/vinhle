import React from 'react';
import { Form, message } from 'antd';
import UserForm from './UserForm';
import { validateFirstName, validateLastName, validateUsername, validateEmail, validatePassword } from './validationUtils';

const RegistrationForm = ({ onUserAdd, users }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { firstName, lastName, username, email, password, confirmPassword } = values;

    if (!validateFirstName(firstName)) {
      message.error('First Name is invalid!');
      return;
    }
    if (!validateLastName(lastName)) {
      message.error('Last Name is invalid!');
      return;
    }
    if (!validateUsername(username)) {
      message.error('Username is invalid!');
      return;
    }
    if (!validateEmail(email)) {
      message.error('Email is invalid!');
      return;
    }
    if (!validatePassword(password)) {
      message.error('Password is invalid!');
      return;
    }
    if (password !== confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    const newUser = {
      key: users.length + 1,
      firstName,
      lastName,
      email,
      username,
    };
    onUserAdd(newUser);
    message.success(`User ${username} created successfully!`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '3px solid #f0f0f0', borderRadius: '8px', marginTop: '30px' }}>
      <UserForm form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </div>
  );
};

export default RegistrationForm;
