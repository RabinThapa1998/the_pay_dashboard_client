import { Space, Table, Tag } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Profile',
    dataIndex: 'photo_url',
    key: 'profile',
    render: (url: string) => <Avatar size={56} src={url} icon={<UserOutlined />} />,
  },
  {
    title: 'Full Name',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const TableComponent = ({ data }: any) => {
  return <Table columns={columns} dataSource={data} />;
};

export { TableComponent };
