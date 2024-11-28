import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import { downloadJson, parseJson, validateJson, formatJson } from '../utils/jsonUtils';
import { setupEditorMarkers, getEditorConfig } from '../utils/editorUtils';
import '../styles/JsonDiff.css';

const JsonDiff = ({ oldValue, newValue, onChange, onResetOld, onResetNew }) => {
  const [oldEditor, setOldEditor] = useState(null);
  const [newEditor, setNewEditor] = useState(null);
  const [oldEditValue, setOldEditValue] = useState(oldValue);
  const [newEditValue, setNewEditValue] = useState(newValue);
  const [currentOldValue, setCurrentOldValue] = useState(oldValue);
  const [currentNewValue, setCurrentNewValue] = useState(newValue);

  // Update state when props change
  useEffect(() => {
    setOldEditValue(oldValue);
    setCurrentOldValue(oldValue);
  }, [oldValue]);

  useEffect(() => {
    setNewEditValue(newValue);
    setCurrentNewValue(newValue);
  }, [newValue]);

  const leftObj = parseJson(currentOldValue);
  const rightObj = parseJson(currentNewValue) || parseJson(newValue);

  useEffect(() => {
    setupEditorMarkers(oldEditor, leftObj, rightObj, true);
    setupEditorMarkers(newEditor, leftObj, rightObj, false);
  }, [oldEditor, newEditor, currentOldValue, currentNewValue]);

  const handleOldEditChange = (value) => {
    setOldEditValue(value);
    if (validateJson(value)) {
      setCurrentOldValue(value);
    }
  };

  const handleNewEditChange = (value) => {
    setNewEditValue(value);
    if (validateJson(value)) {
      setCurrentNewValue(value);
      onChange(value);
    }
  };

  return (
    <div className="json-viewer-container">
      <div className="comparison-container">
        <div className="panel">
          <div className="panel-title">Left JSON</div>
          <div className="editor-container">
            <AceEditor
              {...getEditorConfig(true)}
              value={formatJson(currentOldValue)}
              onLoad={setOldEditor}
            />
          </div>
          <div className="panel-title">Edit Left JSON</div>
          <div className="editor-container">
            <AceEditor
              {...getEditorConfig()}
              value={oldEditValue}
              onChange={handleOldEditChange}
            />
          </div>
          <div className="panel-footer">
            <button 
              className="export-button"
              onClick={() => downloadJson(currentOldValue, 'left-json.json')}
            >
              Export Left JSON
            </button>
            <button 
              className="reset-button"
              onClick={onResetOld}
            >
              Reset Left JSON
            </button>
          </div>
        </div>
        <div className="panel">
          <div className="panel-title">Right JSON</div>
          <div className="editor-container">
            <AceEditor
              {...getEditorConfig(true)}
              value={formatJson(currentNewValue)}
              onLoad={setNewEditor}
            />
          </div>
          <div className="panel-title">Edit Right JSON</div>
          <div className="editor-container">
            <AceEditor
              {...getEditorConfig()}
              value={newEditValue}
              onChange={handleNewEditChange}
            />
          </div>
          <div className="panel-footer">
            <button 
              className="export-button"
              onClick={() => downloadJson(currentNewValue, 'right-json.json')}
            >
              Export Right JSON
            </button>
            <button 
              className="reset-button"
              onClick={onResetNew}
            >
              Reset Right JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonDiff;
