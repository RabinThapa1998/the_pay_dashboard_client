import { Space, Table, Tag } from 'antd';
const columns = [
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
