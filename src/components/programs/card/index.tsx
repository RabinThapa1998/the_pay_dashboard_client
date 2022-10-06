import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, CardProps, Button } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '~components/common';

const { Meta } = Card;

interface ICard extends CardProps {
  title: string;
  desc: string;
  programId: string;
}
function CardComponent({ title, desc, programId, ...rest }: ICard) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const handleClickMore = () => {
    console.log('card clicked');
    navigate(`/programs/${programId}`);
  };

  const handleSetting = () => {
    setIsModalOpen(true);
    console.log('setting clicked');
  };
  const handleModalOk = () => {
    setIsModalOpen(false);
  };
  const hanldeModalCancel = () => {
    setIsModalOpen(false);
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
        <SettingOutlined key='setting' onClick={handleSetting} />,
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
      <Modal open={isModalOpen} onOk={handleModalOk} onCancel={hanldeModalCancel}>
        {<p>Setting</p>}
      </Modal>
    </Card>
  );
}

export { CardComponent };
