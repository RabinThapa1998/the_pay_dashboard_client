import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import React from 'react';
const { Meta } = Card;

interface ICard {
  title: string;
  desc: string;
}
function Index({ title, desc }: ICard) {
  return (
    <Card
      style={{
        width: '100%',
      }}
      cover={
        <img
          alt='example'
          src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
        />
      }
      actions={[
        // <SettingOutlined key='setting' />,
        // <EditOutlined key='edit' />,
        <EllipsisOutlined key='ellipsis' />,
      ]}
    >
      <Meta
        // avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
        title={title}
        description={desc}
      />
    </Card>
  );
}

export default Index;
