import { useState, useEffect } from 'react';
import { getAllStudents, deleteStudent } from './client';
import {
  Layout,
  Menu,
  Breadcrumb,
  Table,
  Spin,
  Empty,
  Button,
  Badge,
  Tag,
  Avatar,
  Radio,
  Popconfirm
} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';
import StudentDrawerForm from "./StudentDrawerForm";

import './App.css';
import { successNotification, errorNotification } from './Notification';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const TheAvatar = ({ name }) => {
  let nameTrimmed = name.trim();
  if (nameTrimmed.length === 0) {
    return <Avatar icon={<UserOutlined />} />
  }
  const nameSplit = nameTrimmed.split(" ");
  if (nameSplit.length === 1) {
    return <Avatar>{name.charAt(0)}</Avatar>
  }
  return <Avatar>{`${name.charAt(0)}${name.charAt(name.lastIndexOf(' ') + 1)}`}</Avatar>
};

const removeStudent = (studentId, callback) => 
  deleteStudent(studentId)
    .then(() => {
      successNotification('Student Deleted', `Successfully deleted student ${studentId}`);
      callback();
    }).catch(e => 
      e.response.json()
        .then(response => errorNotification('ERROR', `[STATUS CODE: ${response.status}] [${response.message}] [${response.error}]`))
    );


const cols = fetchStudents => [
  {
    title: '',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (text, student) => <TheAvatar name={student.name} />
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, student) => 
      <Radio.Group>
        <Popconfirm
          placement='topRight' 
          title={`Are you sure you want to delete ${student.name}?`} 
          okText="Yes" 
          cancelText="No" 
          onConfirm={() => removeStudent(student.id, fetchStudents)}>
          <Radio.Button>Delete</Radio.Button>
        </Popconfirm>
        <Radio.Button>Edit</Radio.Button>
      </Radio.Group>
  }
];


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
  const [students, setStudents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const fetchStudents = () => getAllStudents()
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setStudents(data);
    }).catch(e => {
      console.log(e.response);
      e.response.json().then(res => {
        console.log(res);
        errorNotification('There was an error', `${res.message} [Status Code: ${res.status}] [${res.error}]`);
      });
    }).finally(() => setFetchingData(false));

  useEffect(() => {
    console.log('Component is mounted');
    fetchStudents();
  }, []);

  const renderStudents = () => {
    if (fetchingData) {
      return <Spin indicator={antIcon} />;
    }
    if (students.length <= 0) {
      return (
        <>
          <Button
            onClick={() => setShowDrawer(!showDrawer)} type='primary' shape='round' icon={<PlusOutlined/>} size='medium'>
            Add New Student
          </Button>
          <StudentDrawerForm
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            fetchStudents={fetchStudents}/>
          <Empty />
        </>
      );
    }
    return ( 
      <>
        <StudentDrawerForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          fetchStudents={fetchStudents}
        />
        <Table 
          dataSource={students} 
          columns={cols(fetchStudents)} 
          bordered 
          title={() => 
            <>
              <Button  onClick={() => setShowDrawer(!showDrawer)} type="primary" shape="round" icon={<PlusOutlined /> } 
              size='medium'>Add New Student</Button>
              <Tag style={{ marginLeft: 15 }}>Number of Students</Tag>
              <Badge count={students.length} className="site-badge-count-4" />
            </>
          } 
          pagination={{ pageSize: 5 }} 
          scroll={{ y: 325 }} 
          rowKey={(student) => `student_${student.id}`} />
      </>
    );
  }

  return <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
            </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
            </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
            </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {renderStudents()}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>By Alexander Hamilton</Footer>
    </Layout>
  </Layout>
};

export default App;
