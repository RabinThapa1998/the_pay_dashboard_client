import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { request } from '~components/util';
import { useMutation } from '@tanstack/react-query';
const { TextArea } = Input;

const ProgramAddForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
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

  const onFinish = async (values: any) => {
    await mutate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { ProgramAddForm };
