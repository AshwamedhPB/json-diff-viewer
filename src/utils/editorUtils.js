import { Range } from 'ace-builds';
import { findDifferences } from './jsonUtils';

export const setupEditorMarkers = (editor, oldObj, newObj, isOld) => {
  if (!editor) return;

  const session = editor.getSession();
  const differences = findDifferences(oldObj, newObj, isOld);
  
  // Clear existing markers
  Object.keys(session.$backMarkers || {}).forEach(id => {
    session.removeMarker(id);
  });

  differences.forEach(diff => {
    const { path, type } = diff;
    const pathParts = path.split('.');
    const lastKey = pathParts[pathParts.length - 1];
    
    const lines = session.getDocument().getAllLines();
    
    lines.forEach((line, row) => {
      if (line.includes(`"${lastKey}":`)) {
        const markerType = isOld ? 
          (type === 'removed' ? 'diff-removed' : type === 'modified' ? 'diff-modified' : '') :
          (type === 'added' ? 'diff-added' : type === 'modified' ? 'diff-modified' : '');
        
        if (markerType) {
          session.addMarker(
            new Range(row, 0, row, line.length),
            markerType,
            'fullLine',
            false
          );
        }
      }
    });
  });
};

export const getEditorConfig = (readOnly = false) => ({
  mode: "json",
  theme: "github",
  width: "100%",
  height: "100%",
  showPrintMargin: false,
  setOptions: {
    showLineNumbers: true,
    tabSize: 2,
    useWorker: false
  },
  readOnly
});
