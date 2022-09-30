import React, { useState } from 'react';
import { FormComponent, TableComponent } from '~/components';
import { Button, Col, Row } from 'antd';
import { Modal } from '~/components/common';
import { useQuery } from '@tanstack/react-query';
import { request } from '~components/util';
import { Space, Spin } from 'antd';
import { useParams } from 'react-router-dom';

export function ProgramsDetail() {
  const { id } = useParams();
  console.log('🚀 ~ file: ProgramsDetail.tsx ~ line 12 ~ ProgramsDetail ~ id', id);
  const { data: res, isLoading } = useQuery(
    ['programs', id],
    (): Promise<{
      data: {
        contestents: { [key: string]: string }[];
        programs: any;
      };
    }> =>
      request({
        url: `/programs/${id}`,
        method: 'GET',
      }),
  );

  //   console.log('🚀 ~ file: ProgramsDetail.tsx ~ line 13 ~ ProgramsDetail ~ data', data);
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        {res ? (
          <TableComponent data={res.data.contestents} />
        ) : (
          <Space direction='horizontal' style={{ width: '100%', justifyContent: 'center' }}>
            <Spin size='large' />
          </Space>
        )}
      </Col>
    </Row>
  );
}
