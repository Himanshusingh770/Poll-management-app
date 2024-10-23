import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../App.css';

const SuccessModal = ({ show, onClose, message, okButton, onOkClick }) => {
  return (
    <Modal show={show} centered size="sm">
      <Modal.Body className="text-center">
        <p className="text-success fs-4">{message}</p>
        <p>Your account has been created successfully. You can now log in.</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          className="rounded-pill ok-button"
          variant="success"
          onClick={onOkClick} // Use the passed onOkClick prop
        >
          {okButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
