import React, { FC, ReactChildren, ReactElement } from 'react';
import { Modal } from 'react-bootstrap';

interface IModalOverlay {
  children?: (ReactChildren & ReactElement) | ReactElement<any, any>;
  show: boolean;
  onHide: () => void;
  title?: string;
}

const ModalWrapper: FC<IModalOverlay> = ({ children, ...props }) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body> {children}</Modal.Body>
    </Modal>
  );
};

export default ModalWrapper;
