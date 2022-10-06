import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Card, CardProps, Button, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '~/components/util';
import { Modal } from '~components/common';

const { Meta } = Card;

interface ICard extends CardProps {
  title: string;
  desc: string;
  programId: string;
}
function CardComponent({ title, desc, programId, ...rest }: ICard) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useMutation(
    () =>
      request({
        url: `/programs/${programId}`,
        method: 'DELETE',
      }),
    {
      onSuccess: () => {
        message.success('Program deleted successfully!');
        setIsModalOpen(false);
      },
      onError: () => {
        message.error('Error Try Again!');
        setIsModalOpen(false);
      },
    },
  );

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
  const handleProgramDelete = async () => {
    await mutate();
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
      <Modal open={isModalOpen} onOk={handleModalOk} onCancel={hanldeModalCancel} footer={null}>
        {
          <div className='flex flex-col items-center justify-center'>
            <p className='text-lg'>{title}</p>
            <h1 className='text-base font-semibold'>
              Are you sure you want to delete this program?
            </h1>
            <p className='text-sm text-gray-500 text-center'>
              All the contestant related to that programs will be deleted along with the program.
            </p>
            <div className='flex flex-row items-center justify-end w-full gap-2'>
              <Button type='primary' onClick={handleProgramDelete} danger>
                Delete
              </Button>
              <Button onClick={hanldeModalCancel}>No</Button>
            </div>
          </div>
        }
      </Modal>
    </Card>
  );
}

export { CardComponent };
