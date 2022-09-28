import { Button, Modal, ModalProps } from 'antd';
import React, { useState } from 'react';

interface IModal extends ModalProps {
  children: React.ReactNode;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}
function Index({ children, onCancel, onOk, open, ...rest }: IModal) {
  return (
    <Modal open={open} onOk={onOk} onCancel={onCancel} {...rest}>
      {children}
    </Modal>
  );
}

export default Index;
