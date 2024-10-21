import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css'
const SuccessModal = ({ show, onClose }) => {
  const navigate = useNavigate();
  const handleOkClick = () => {
    navigate('/');
    onClose(); 
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-success">Sign Up Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p className="text-success">Sign Up Successfully!!</p>
        <p>Your account has been created successfully. You can now log in.</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center ">
        <Button
          className="rounded-pill  ok-button"
          variant="success"
          onClick={handleOkClick}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
