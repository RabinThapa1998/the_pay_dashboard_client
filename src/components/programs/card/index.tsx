import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, CardProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

interface ICard extends CardProps {
  title: string;
  desc: string;
  programId: string;
}
function CardComponent({ title, desc, programId, ...rest }: ICard) {
  const navigate = useNavigate();
  const handleClickMore = () => {
    console.log('card clicked');
    navigate(`/programs/${programId}`);
  };
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
        <SettingOutlined key='setting' />,
        // <EditOutlined key='edit' />,
        <EllipsisOutlined key='ellipsis' onClick={handleClickMore} />,
      ]}
      {...rest}
    >
      <Meta
        // avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
        title={title}
        description={desc}
      />
    </Card>
  );
}

export { CardComponent };
