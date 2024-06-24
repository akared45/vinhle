import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';
import RegistrationForm from './RegistrationForm';
import UserTable from './UserTable';

const { Sider } = Layout;

const SiderApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  const [users, setUsers] = useState([
    {
      key: 1,
      firstName: 'Trần Lê Anh',
      lastName: 'leanh',
      email: 'leanh@gmail.com',
      username: 'leanh',
    },
    {
      key: 2,
      firstName: 'Vũ Văn Vinh',
      lastName: 'vinhvan',
      email: 'vinhvan@gmail.com',
      username: 'vinhvan',
    },
    {
      key: 3,
      firstName: 'Hoàng Thúy Quỳnh',
      lastName: 'thuyquynh',
      email: 'thuyquynh@hotmail.com',
      username: 'thuyquynh',
    },
  ]);

  const handleMenuClick = (key) => {
    setSelectedMenuItem(key);
  };

  const handleUserAdd = (newUser) => {
    setUsers([...users, newUser]);
  };
  const handleUserEdit = (editedUser) => {
    const updatedUsers = users.map(user =>
      user.key === editedUser.key ? { ...user, ...editedUser } : user
    );
    setUsers(updatedUsers);
  };

  const handleUserDelete = (key) => {
    const filteredUsers = users.filter(user => user.key !== key);
    setUsers(filteredUsers);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => handleMenuClick('1')}>
            Registration
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={() => handleMenuClick('2')}>
            User
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Layout.Content style={{ margin: '20px', padding: '20px', background: '#fff', minHeight: 280 }}>
          {selectedMenuItem === '1' && <RegistrationForm onUserAdd={handleUserAdd} users={users} />}
          {selectedMenuItem === '2' && <UserTable users={users} onUserEdit={handleUserEdit} onUserDelete={handleUserDelete} /> }
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default SiderApp;
