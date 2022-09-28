import { Button, Modal } from 'antd';
import React, { useState } from 'react';

interface IModal {
  children: React.ReactNode;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}
function Index({ children, onCancel, onOk, open }: IModal) {
  return (
    <>
      <Modal title='Basic Modal' open={open} onOk={onOk} onCancel={onCancel}>
        {children}
      </Modal>
    </>
  );
}

export default Index;
