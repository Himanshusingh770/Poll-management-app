import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastMessage = ({
  show,
  onClose,
  message,
  variant = 'danger',
  delay = 6000
}) => {
  return (
    <ToastContainer
      position="bottom-center"
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '40px'
      }}
    >
      <Toast show={show} onClose={onClose} delay={delay} autohide bg={variant}>
        <Toast.Header closeButton>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="text-light">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
