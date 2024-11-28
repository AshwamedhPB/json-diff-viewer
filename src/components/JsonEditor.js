import React from 'react';
import AceEditor from 'react-ace';
import { getEditorConfig } from '../utils/editorUtils';
import styled from 'styled-components';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const EditorTitle = styled.h2`
  margin: 0;
  padding: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  border-bottom: 1px solid #eee;
`;

const EditorContent = styled.div`
  flex: 1;
  min-height: 0;

  .ace_editor {
    width: 100% !important;
    height: 100% !important;
  }
`;

const JsonEditor = ({ value, label, onChange }) => {
  return (
    <EditorContainer>
      <EditorTitle>{label}</EditorTitle>
      <EditorContent>
        <AceEditor
          {...getEditorConfig()}
          value={value}
          onChange={onChange}
          name={`json-editor-${label}`}
        />
      </EditorContent>
    </EditorContainer>
  );
};

export default JsonEditor;
