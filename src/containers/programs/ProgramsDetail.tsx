import React, { useState } from 'react';
import { TableComponent } from '~/components';
import { Button, Col, Row, Drawer } from 'antd';
import { Modal } from '~/components/common';
import { useQuery } from '@tanstack/react-query';
import { request } from '~components/util';
import { Space, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { ContestantAddForm, PaymentSchemaUpdateForm } from '~components/programs/form-component';
import { SettingOutlined } from '@ant-design/icons';
import { IProgramDetails } from '~/types/programs';

export function ProgramsDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  const showDrawer = () => {
    setOpenSideDrawer(true);
  };

  const onClose = () => {
    setOpenSideDrawer(false);
  };

  const { data: res, isLoading } = useQuery(
    ['programs', id],
    (): Promise<IProgramDetails> =>
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

  const handleContestantsSettings = () => {
    console.log('contestants settings clicked');
  };
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        {/* <Space direction='horizontal' style={{ width: '100%', justifyContent: 'center' }}> */}
        <h3 className='text-xs uppercase text-gray-400'>Program</h3>
        <h3 className='text-xl font-semibold uppercase'>{res?.data?.program?.name}</h3>
        {/* </Space> */}
      </Col>
      <Col span={24}>
        <Space direction='horizontal' style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button.Group>
            <Button onClick={handleAddContestants}>Add Contestants</Button>
            <Button onClick={handleContestantsSettings}>
              <SettingOutlined />
            </Button>
          </Button.Group>
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
      <Col span={24}>
        <Row>
          <h3 className='text-xl font-semibold'>Payment Schema</h3>
        </Row>
        <Row>
          <Button onClick={showDrawer}>Edit</Button>
          <Drawer title='Basic Drawer' placement='right' onClose={onClose} open={openSideDrawer}>
            <PaymentSchemaUpdateForm />
          </Drawer>
        </Row>
        <div>
          {res?.data.program.payment_schema.map((item) => (
            <div key={item.votes} className='flex flex-row gap-2'>
              <p className='bg-orange-500 text-white py-4 px-2 w-20 rounded-sm text-xl text-center'>
                {item.votes} <br />
                votes
              </p>
              <p className='bg-green-500 text-white py-4 px-2 w-20 rounded-sm text-xl text-center'>
                {item.cost}
                <br />
                cost
              </p>
            </div>
          ))}
        </div>
      </Col>
      {res && (
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => setIsModalOpen(false)}
          footer={null}
          title={'Add Program'}
        >
          <ContestantAddForm
            closeModal={handleModalClose}
            program={{ programId: res.data.program.id, programName: res.data.program.name }}
          />
        </Modal>
      )}
    </Row>
  );
}
