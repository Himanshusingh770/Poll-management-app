import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const CustomButton = ({ isLoading, variant, children, className, ...props }) => {
  return (
    <Button
      className={`button-custom ${className}`} 
      variant={isLoading ? 'secondary' : variant}
      {...props}
      disabled={isLoading}
    >
      {isLoading ? <Spinner animation="border" size="sm" /> : children}
    </Button>
  );
};

export default CustomButton;
