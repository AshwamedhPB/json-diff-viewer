import React, { useState, useCallback } from 'react';
import JsonDiff from './components/JsonDiff';
import ErrorMessage from './components/ErrorMessage';
import customConfig from './data/customConfig.json';
import newVersionConfig from './data/newVersionConfig.json';
import { formatJson, mergeConfigs } from './utils/jsonUtils';
import './App.css';

function App() {
  const initialOldJson = formatJson(JSON.stringify(customConfig));
  const initialNewJson = formatJson(JSON.stringify(newVersionConfig));

  const [oldJson, setOldJson] = useState(initialOldJson);
  const [newJson, setNewJson] = useState(initialNewJson);
  const [errorMessage, setErrorMessage] = useState('');

  const handleJsonChange = (value) => {
    setNewJson(value);
  };

  const handleResetOld = useCallback(() => {
    setOldJson(initialOldJson);
  }, [initialOldJson]);

  const handleResetNew = useCallback(() => {
    setNewJson(initialNewJson);
  }, [initialNewJson]);

  const handleMergeNewIntoOld = () => {
    try {
      const mergedJson = mergeConfigs(newJson, oldJson);
      setOldJson(mergedJson);
      setErrorMessage('');
      console.log('Successfully merged new into old');
    } catch (error) {
      console.error('Error during merge:', error);
      setErrorMessage(error.message || 'Failed to merge configurations. Please ensure both JSONs are valid.');
    }
  };

  const handleMergeOldIntoNew = () => {
    try {
      const mergedJson = mergeConfigs(oldJson, newJson);
      setNewJson(mergedJson);
      setErrorMessage('');
      console.log('Successfully merged old into new');
    } catch (error) {
      console.error('Error during merge:', error);
      setErrorMessage(error.message || 'Failed to merge configurations. Please ensure both JSONs are valid.');
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Configuration Comparison</h1>
        <div className="button-group">
          <button className="merge-button" onClick={handleMergeNewIntoOld}>
            Auto-merge New ➔ Old
          </button>
          <button className="merge-button" onClick={handleMergeOldIntoNew}>
            Auto-merge Old ➔ New
          </button>
        </div>
      </div>
      <ErrorMessage 
        message={errorMessage} 
        onClose={() => setErrorMessage('')}
      />
      <JsonDiff 
        oldValue={oldJson}
        newValue={newJson}
        onChange={handleJsonChange}
        onResetOld={handleResetOld}
        onResetNew={handleResetNew}
      />
    </div>
  );
}

export default App;