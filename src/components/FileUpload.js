import React, { useRef } from 'react';
import styled from 'styled-components';
import { validateJson } from '../utils/jsonUtils';

const UploadButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: 2px dashed #2196f3;
  background-color: transparent;
  color: #2196f3;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: rgba(33, 150, 243, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileUpload = ({ onLoad, label }) => {
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        if (validateJson(content)) {
          onLoad(content);
        } else {
          alert('Invalid JSON file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <UploadButton onClick={() => fileInputRef.current.click()}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711C16.6333 11.4616 17.2665 11.4616 17.657 11.0711C18.0475 10.6806 18.0475 10.0474 17.657 9.65689L12.7071 4.70697C12.3166 4.31645 11.6834 4.31645 11.2929 4.70697L6.34315 9.65689C5.95262 10.0474 5.95262 10.6806 6.34315 11.0711C6.73367 11.4616 7.36684 11.4616 7.75736 11.0711L11 7.82831V14.9861Z" fill="currentColor"/>
          <path d="M4 14C4 13.4477 3.55228 13 3 13C2.44772 13 2 13.4477 2 14V16C2 18.2091 3.79086 20 6 20H18C20.2091 20 22 18.2091 22 16V14C22 13.4477 21.5523 13 21 13C20.4477 13 20 13.4477 20 14V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V14Z" fill="currentColor"/>
        </svg>
        {label}
      </UploadButton>
      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
      />
    </>
  );
};

export default FileUpload;
