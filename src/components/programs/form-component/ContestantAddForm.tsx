import { Button, Checkbox, Form, Input, message, Select } from 'antd';
import React from 'react';
import { request } from '~components/util';
import { useMutation } from '@tanstack/react-query';
const { TextArea } = Input;
const { Option } = Select;

const ContestantAddForm: React.FC<{
  closeModal: () => void;
  program: { programId: string; programName: string };
}> = ({ closeModal, program }) => {
  const { mutate, isLoading } = useMutation(
    (values) =>
      request({
        url: '/contestants',
        method: 'POST',
        data: values,
      }),
    {
      onSuccess: () => {
        message.success('Contestant added successfully');
        setTimeout(() => {
          closeModal();
        }, 1000);
      },
      onError: (error: any) => {
        console.log('🚀 ~ file: ContestantAddForm.tsx ~ line 27 ~ error', error);
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
      name='contestants'
      initialValues={{ remember: true, program: program.programId }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      layout='vertical'
    >
      <Form.Item
        label='Full Name'
        name='full_name'
        rules={[{ required: true, message: 'Full name is required!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label='Progam Name' name='program' rules={[{ required: true }]}>
        <Select value={program.programId}>
          <Option value={program.programId} key={program.programId}>
            {program.programName}
          </Option>
        </Select>
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Email is required', type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { ContestantAddForm };
