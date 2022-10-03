import React, { useState } from 'react';
import { TableComponent } from '~/components';
import { Button, Col, Row } from 'antd';
import { Modal } from '~/components/common';
import { useQuery } from '@tanstack/react-query';
import { request } from '~components/util';
import { Space, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { ContestantAddForm } from '~components/programs/form-component';

export function ProgramsDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: res, isLoading } = useQuery(
    ['programs', id],
    (): Promise<{
      data: {
        contestants: { [key: string]: string }[];
        program: any;
      };
    }> =>
      request({
        url: `/programs/${id}`,
        method: 'GET',
      }),
  );
  const handleAddContestants = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        {/* <Space direction='horizontal' style={{ width: '100%', justifyContent: 'center' }}> */}
        <h3 className='text-center text-2xl uppercase'>{res?.data?.program?.name}</h3>
        {/* </Space> */}
      </Col>
      <Col span={24}>
        <Space direction='horizontal' style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={handleAddContestants}>Add Contestants</Button>
        </Space>
      </Col>
      <Col span={24}>
        {res ? (
          <TableComponent data={res.data.contestants} />
        ) : (
          <Space direction='horizontal' style={{ width: '100%', justifyContent: 'center' }}>
            <Spin size='large' />
          </Space>
        )}
      </Col>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        footer={null}
        title={'Add Program'}
      >
        {<ContestantAddForm closeModal={handleModalClose} />}
      </Modal>
    </Row>
  );
}
