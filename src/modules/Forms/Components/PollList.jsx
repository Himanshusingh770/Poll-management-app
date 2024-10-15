// src/components/PollList.js
import React from 'react';
import { Container } from 'react-bootstrap';

const PollList = () => {
  return (
    <Container className="mt-5">
      <h2>Poll List</h2>
      <p>Currently, there are no polls available.</p>
    </Container>
  );
};

export default PollList;
