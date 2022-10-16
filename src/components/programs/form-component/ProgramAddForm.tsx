import { Button, Checkbox, Form, Input, message, InputNumber } from 'antd';
import React, { useState } from 'react';
import { request } from '~components/util';
import { useMutation } from '@tanstack/react-query';
const { TextArea } = Input;

const ProgramAddForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [form] = Form.useForm();
  const [fieldCount, setFieldCount] = useState([0]);
  const [votesCost, setVotesCost] = useState<any>({
    votes: 0,
    cost: 0,
  });
  const [votesCostField, setVotesCostField] = useState<any>([]);
  console.log('🚀 ~ file: ProgramAddForm.tsx ~ line 11 ~ votesCostField', votesCostField);
  const { mutate, isLoading } = useMutation(
    (values) =>
      request({
        url: '/programs',
        method: 'POST',
        data: values,
      }),
    {
      onSuccess: () => {
        message.success('Program added successfully');
        closeModal();
      },
      onError: (error: any) => {
        console.log('🚀 ~ file: index.tsx ~ line 20 ~ error', error);
        message.error(error.response.data.errors[0].message);
      },
    },
  );

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
  const onFinish = async (values: any) => {
    console.log('🚀 ~ file: ProgramAddForm.tsx ~ line 28 ~ onFinish ~ values', values);
    await mutate({ ...values, payment_schema: votesCostField });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
      name='basic'
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      layout='vertical'
      form={form}
    >
      <Form.Item
        label='Progam Name'
        name='name'
        rules={[{ required: true, message: 'Please input your program name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label='Description' name='desc' rules={[{ required: false }]}>
        <TextArea rows={4} />
      </Form.Item>
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
};

export { ProgramAddForm };
