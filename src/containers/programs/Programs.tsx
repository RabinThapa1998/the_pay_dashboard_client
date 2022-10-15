import React, { useState } from 'react';
import { CardComponent, ProgramAddForm } from '~/components';
import { Button, Col, Row } from 'antd';
import { Modal } from '~/components/common';
import { useQuery } from '@tanstack/react-query';
import { request } from '~components/util';
import { Space, Spin } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';

export function Programs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useQuery(
    ['programs'],
    (): Promise<{
      data: {
        [key: string]: string;
      }[];
      message: string;
    }> =>
      request({
        url: '/programs',
        method: 'GET',
      }),
  );

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space direction='horizontal' style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button
            type='primary'
            onClick={() => setIsModalOpen(true)}
            className='self-end'
            icon={<AppstoreAddOutlined />}
          >
            Add Program
          </Button>
        </Space>
      </Col>
      {data?.data.length ? (
        data.data.map((item, index) => (
          <Col key={index} span={6}>
            <CardComponent
              title={item.name}
              desc={item.desc}
              programId={item.id}
              imageUrl={item.image_url}
            />
          </Col>
        ))
      ) : (
        <>
          {[1, 2, 3].map((item) => (
            <Col span={6} key={item}>
              <CardComponent title={''} desc={''} programId={''} loading />
            </Col>
          ))}
        </>
      )}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        footer={null}
        title={'Add Program'}
      >
        {<ProgramAddForm closeModal={() => setIsModalOpen(false)} />}
      </Modal>
    </Row>
  );
}
