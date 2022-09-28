import React, { useState } from 'react';
import { Card, FormComponent } from '~/components';
import { Button, Col, Row } from 'antd';
import { Modal } from '~/components/common';

export function Programs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Button type='primary' onClick={() => setIsModalOpen(true)} className='self-end'>
          Open Modal
        </Button>
      </Col>
      {[1, 2, 3, 4].map((item, index) => (
        <Col key={index} span={6}>
          <Card />
        </Col>
      ))}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        footer={null}
      >
        {<FormComponent closeModal={() => setIsModalOpen(false)} />}
      </Modal>
    </Row>
  );
}
