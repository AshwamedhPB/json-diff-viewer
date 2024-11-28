import React, { useState, useEffect } from 'react';
import JsonDiff from './components/JsonDiff';
import ErrorMessage from './components/ErrorMessage';
import customConfig from './data/customConfig.json';
import rightVersionConfig from './data/newVersionConfig.json';
import { formatJson, mergeConfigs } from './utils/jsonUtils';
import './App.css';

function App() {
  const initialLeftJson = formatJson(JSON.stringify(customConfig));
  const initialRightJson = formatJson(JSON.stringify(rightVersionConfig));

  const [leftJson, setLeftJson] = useState(initialLeftJson);
  const [rightJson, setRightJson] = useState(initialRightJson);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRightEditorChange = (value) => {
    setRightJson(value);
  };

  useEffect(() => {
    setLeftJson(initialLeftJson);
  }, [initialLeftJson]);

  useEffect(() => {
    setRightJson(initialRightJson);
  }, [initialRightJson]);

  const handleMergeLeft = () => {
    try {
      const mergedJson = mergeConfigs(rightJson, leftJson);
      setLeftJson(mergedJson);
      setErrorMessage('');
      console.log('Successfully merged right into left');
    } catch (error) {
      console.error('Error during merge:', error);
      setErrorMessage(error.message || 'Failed to merge configurations. Please ensure both JSONs are valid.');
    }
  };

  const handleMergeRight = () => {
    try {
      const mergedJson = mergeConfigs(leftJson, rightJson);
      setRightJson(mergedJson);
      setErrorMessage('');
      console.log('Successfully merged left into right');
    } catch (error) {
      console.error('Error during merge:', error);
      setErrorMessage(error.message || 'Failed to merge configurations. Please ensure both JSONs are valid.');
    }
  };

  return (
    <div className="app">
      <div className="header">
        <button className="merge-button" onClick={handleMergeLeft}>
          ◀ Auto-merge Right to Left
        </button>
        <h1>JSON Diff-Viewer</h1>
        <button className="merge-button" onClick={handleMergeRight}>
          Auto-merge Left to Right ▶
        </button>
      </div>
      <ErrorMessage 
        message={errorMessage} 
        onClose={() => setErrorMessage('')}
      />
      <JsonDiff 
        oldValue={leftJson}
        newValue={rightJson}
        onChange={handleRightEditorChange}
        onResetOld={() => setLeftJson(initialLeftJson)}
        onResetNew={() => setRightJson(initialRightJson)}
      />
    </div>
  );
}

export default App;