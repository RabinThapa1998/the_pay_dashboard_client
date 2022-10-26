import { Button, Checkbox, Form, Input, message, InputNumber } from 'antd';
import React, { useState } from 'react';
import { request } from '~components/util';
import { useMutation } from '@tanstack/react-query';

function PaymentSchemaUpdateForm({ id }: { id: string }) {
  const [votesCost, setVotesCost] = useState<any>({
    votes: 0,
    cost: 0,
  });
  const [votesCostField, setVotesCostField] = useState<any>([]);
  const { mutate, isLoading } = useMutation(
    (values) =>
      request({
        url: `/programs/${id}`,
        method: 'PATCH',
        data: values,
      }),
    {
      onSuccess: () => {
        message.success('Payment Schema updated successfully');
      },
      onError: (error: any) => {
        message.error(error.response.data.errors[0].message);
      },
    },
  );

  const onFinish = async (values: any) => {
    await mutate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleCostVotesChange = (value: any, name: string) => {
    setVotesCost({
      ...votesCost,
      [name]: value,
    });
  };
  const handleVotesCostField = () => {
    if (votesCost.cost !== 0 && votesCost.votes !== 0) {
      setVotesCostField([...votesCostField, votesCost]);
    }
  };
  return (
    <Form
      name='contestants'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      layout='vertical'
    >
      <Input.Group compact>
        <InputNumber
          name='votes'
          onChange={(value) => handleCostVotesChange(value, 'votes')}
          onBlur={handleVotesCostField}
          type='number'
        />
        <InputNumber
          name='cost'
          onChange={(value) => handleCostVotesChange(value, 'cost')}
          onBlur={handleVotesCostField}
          type='number'
        />
      </Input.Group>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export { PaymentSchemaUpdateForm };
