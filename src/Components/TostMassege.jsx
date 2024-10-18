import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import '../App.css';  // Ensure that App.css is imported here

const ToastMessage = ({
  show,
  onClose,
  message,
  variant = 'danger',  // Default variant is 'danger'
  delay = 6000
}) => {
  // Set the title based on the variant
  const title = variant === 'success' ? 'Success' : 'Error';

  return (
    <ToastContainer className="toast-container" position="bottom-center ">
      <Toast show={show} onClose={onClose} delay={delay} autohide bg={variant}>
        <Toast.Header closeButton>
          <strong className="me-auto">{title}</strong> {/* Dynamic title */}
        </Toast.Header>
        <Toast.Body className="text-light">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
