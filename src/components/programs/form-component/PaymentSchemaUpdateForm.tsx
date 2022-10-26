import { Button, Checkbox, Form, Input, message, InputNumber } from 'antd';
import React, { useState } from 'react';
import { request } from '~components/util';
import { useMutation } from '@tanstack/react-query';

function PaymentSchemaUpdateForm({ id }: { id: string }) {
  const [fieldCount, setFieldCount] = useState([0]);

  const [votesCost, setVotesCost] = useState<any>({
    votes: 0,
    cost: 0,
  });
  const [votesCostField, setVotesCostField] = useState<any>([]);
  const { mutate, isLoading } = useMutation(
    (values: any) =>
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

  const onFinish = async () => {
    await mutate({ payment_schema: votesCostField });
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
  const handleVotesCostAdd = (i: number) => {
    setFieldCount([...fieldCount, i]);
    setVotesCost({
      votes: 0,
      cost: 0,
    });
  };
  const handleVotesCostDelete = (i: number) => {
    const newFieldCount = fieldCount.filter((item) => item !== i);
    setFieldCount(newFieldCount);
  };
  return (
    <Form
      name='contestants'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      layout='vertical'
    >
      {fieldCount.map((item) => (
        <Input.Group compact key={item}>
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
          <Button onClick={() => handleVotesCostAdd(item + 1)}>Add</Button>
          {item > 0 && <Button onClick={() => handleVotesCostDelete(item)}>Delete</Button>}
        </Input.Group>
      ))}
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export { PaymentSchemaUpdateForm };
