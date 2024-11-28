export const deepMerge = (target, source) => {
  if (typeof source !== 'object' || source === null) {
    return source;
  }

  if (typeof target !== 'object' || target === null) {
    return Array.isArray(source) ? [...source] : { ...source };
  }

  // Type mismatch between arrays and objects
  if (Array.isArray(target) !== Array.isArray(source)) {
    throw new Error('Cannot merge array with non-array');
  }

  if (Array.isArray(source)) {
    if (!Array.isArray(target)) {
      throw new Error('Type mismatch: Cannot merge array with non-array');
    }
    return [...source.map((item, index) => 
      index < target.length ? deepMerge(target[index], item) : item
    )];
  }

  const merged = { ...target };
  
  for (const key in source) {
    try {
      if (key in target) {
        merged[key] = deepMerge(target[key], source[key]);
      } else {
        merged[key] = source[key];
      }
    } catch (error) {
      throw new Error(`Error merging key "${key}": ${error.message}`);
    }
  }
  
  return merged;
};

export const downloadJson = (jsonContent, filename) => {
  try {
    // Validate and format JSON
    const formattedJson = JSON.stringify(JSON.parse(jsonContent), null, 2);
    
    // Create blob and download link
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading JSON:', error);
    alert('Error saving file. Please check if the JSON is valid.');
  }
};

export const findDifferences = (obj1, obj2, isOld) => {
  const differences = [];
  
  const compare = (path, val1, val2) => {
    if (val1 === val2) return;
    
    if (typeof val1 !== typeof val2 || 
        val1 === null || 
        val2 === null || 
        typeof val1 !== 'object') {
      differences.push({ 
        path, 
        type: isOld ? 'removed' : 'added',
        oldValue: val1,
        newValue: val2
      });
      return;
    }
    
    if (Array.isArray(val1) !== Array.isArray(val2)) {
      differences.push({ 
        path, 
        type: 'modified',
        oldValue: val1,
        newValue: val2
      });
      return;
    }
    
    const keys = new Set([...Object.keys(val1), ...Object.keys(val2)]);
    for (const key of keys) {
      const newPath = path ? `${path}.${key}` : key;
      if (!(key in val1)) {
        differences.push({ 
          path: newPath, 
          type: isOld ? 'removed' : 'added',
          oldValue: undefined,
          newValue: val2[key]
        });
      } else if (!(key in val2)) {
        differences.push({ 
          path: newPath, 
          type: isOld ? 'added' : 'removed',
          oldValue: val1[key],
          newValue: undefined
        });
      } else {
        compare(newPath, val1[key], val2[key]);
      }
    }
  };
  
  compare('', obj1, obj2);
  return differences;
};

export const formatJson = (value) => {
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch (e) {
    return value;
  }
};

export const validateJson = (value) => {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
};

export const parseJson = (value, fallback = null) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return fallback;
  }
};

export const validateMerge = (target, source) => {
  const issues = [];

  const checkTypes = (path, val1, val2) => {
    if (val1 === null || val2 === null) return;
    
    const type1 = Array.isArray(val1) ? 'array' : typeof val1;
    const type2 = Array.isArray(val2) ? 'array' : typeof val2;
    
    if (type1 !== type2) {
      issues.push({
        path: path,
        message: `Type mismatch: ${path} is ${type1} in target but ${type2} in source`,
        severity: 'error'
      });
    }
    
    if (type1 === 'object' && type2 === 'object') {
      Object.keys(val2).forEach(key => {
        const newPath = path ? `${path}.${key}` : key;
        if (key in val1) {
          checkTypes(newPath, val1[key], val2[key]);
        }
      });
    }
  };

  checkTypes('', target, source);
  return issues;
};

export const mergeConfigs = (sourceConfig, targetConfig) => {
  try {
    // Parse JSON strings if needed
    const source = typeof sourceConfig === 'string' ? JSON.parse(sourceConfig) : sourceConfig;
    const target = typeof targetConfig === 'string' ? JSON.parse(targetConfig) : targetConfig;
    
    // Validate before merging
    const issues = validateMerge(target, source);
    if (issues.length > 0) {
      const errorMessages = issues
        .map(issue => `- ${issue.path}: ${issue.message}`)
        .join('\n');
      throw new Error(`Cannot safely merge configurations:\n${errorMessages}`);
    }

    // Perform the deep merge
    const merged = deepMerge(target, source);
    
    // Return formatted JSON string
    return JSON.stringify(merged, null, 2);
  } catch (error) {
    console.error('Error merging configs:', error);
    throw error;
  }
};
