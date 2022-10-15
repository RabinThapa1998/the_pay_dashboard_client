import { Button, Checkbox, Form, Input, message, InputNumber } from 'antd';
import React, { useState } from 'react';
import { request } from '~components/util';
import { useMutation } from '@tanstack/react-query';
const { TextArea } = Input;

const ProgramAddForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [fieldCount, setFieldCount] = useState([0]);
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

  const handleVotesChange = (value: any) => {
    console.log('votes', value);
  };
  const handleCostsChange = (value: any) => {
    console.log('cost', value);
  };

  const onFinish = async (values: any) => {
    console.log('🚀 ~ file: ProgramAddForm.tsx ~ line 28 ~ onFinish ~ values', values);
    // await mutate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleVotesCostAdd = (i: number) => {
    setFieldCount([...fieldCount, i]);
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
          <InputNumber name='votes' onChange={handleVotesChange} />
          <InputNumber name='cost' onChange={handleCostsChange} />
          <Button onClick={() => handleVotesCostAdd(item + 1)}>Add</Button>
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
