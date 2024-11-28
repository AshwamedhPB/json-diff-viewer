import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: #ffebee;
  border: 1px solid #ef5350;
  border-radius: 4px;
  color: #c62828;
  margin: 10px 0;
  padding: 12px;
  position: relative;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 14px;
  max-height: 200px;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #c62828;
  cursor: pointer;
  font-size: 18px;
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #b71c1c;
  }
`;

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <ErrorContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      {message}
    </ErrorContainer>
  );
};

export default ErrorMessage;
