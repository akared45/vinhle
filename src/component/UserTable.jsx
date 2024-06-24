import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const UserTable = ({ users, onUserEdit, onUserDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('edit');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users); 

  useEffect(() => {
    setSelectedUser(null);
    filterUsers();
  }, [users, searchText]);

  const columns = [
    {
      title: 'Nrb',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
        </span>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: 'Delete User',
      content: 'Do you want to delete this user?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        onUserDelete(key);
        message.success('User deleted successfully!');
      },
    });
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setSearchText(searchInput.trim());
    filterUsers();
  };

  const filterUsers = () => {
    const filteredData = users.filter(user =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      setSelectedUser({ ...selectedUser, ...values });
      onUserEdit({ ...selectedUser, ...values });
      message.success(<>User <b>{selectedUser.username}</b> edited successfully!</>);
      setIsModalVisible(false);
    })
    .catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const [form] = Form.useForm();

  return (
    <>
      <Input
        placeholder="Search..."
        allowClear
        style={{ width: 200, marginBottom: 16 }}
        value={searchInput}
        onChange={handleInputChange}
      />
      <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} style={{ marginBottom: 16, marginLeft: 16 }}>
        Search
      </Button>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        pagination={false}
        bordered
      />
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Edit"
        cancelText="Cancel"
      >
        <Form
          form={form}
          initialValues={selectedUser}
          onFinish={handleOk}
          onFinishFailed={handleCancel}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input username!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserTable;
