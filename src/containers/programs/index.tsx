import React, { useState } from 'react';
import { Card, FormComponent } from '~/components';
import { Button, Col, Row } from 'antd';
import { Modal } from '~/components/common';
import { useQuery } from '@tanstack/react-query';
import { request } from '~components/util';
import { Space, Spin } from 'antd';

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
  console.log('🚀 ~ file: index.tsx ~ line 16 ~ const{data,isLoading}=useQuery ~ data', data);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space direction='horizontal' style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button type='primary' onClick={() => setIsModalOpen(true)} className='self-end'>
            Add Program
          </Button>
        </Space>
      </Col>
      {data?.data.length ? (
        data.data.map((item, index) => (
          <Col key={index} span={6}>
            <Card title={item.name} desc={item.desc} />
          </Col>
        ))
      ) : (
        <Col span={24}>
          <Space direction='horizontal' style={{ width: '100%', justifyContent: 'center' }}>
            <Spin size='large' />
          </Space>
        </Col>
      )}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        footer={null}
        title={'Add Program'}
      >
        {<FormComponent closeModal={() => setIsModalOpen(false)} />}
      </Modal>
    </Row>
  );
}
