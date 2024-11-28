# JSON Diff Tool

A React-based tool for comparing, merging, and editing JSON configurations with advanced diff visualization and automatic merge capabilities.

## Features

- Side-by-side JSON comparison with visual diff highlighting
- Real-time JSON validation and formatting
- Automatic merge functionality:
  - Merge new config into old config
  - Merge old config into new config
- Smart conflict detection:
  - Type mismatch detection
  - Array-object conflict prevention
  - Detailed error reporting
- Export capabilities:
  - Export old configuration
  - Export new configuration
- Reset functionality:
  - Reset to original old config
  - Reset to original new config
- Error handling:
  - Visual error display
  - Detailed error messages with JSON paths
  - Closeable error notifications

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3001`

## Usage

### Basic Operations
1. The tool loads with default old and new configurations
2. Edit configurations using the built-in JSON editors
3. Changes are validated in real-time
4. Visual diff highlighting shows differences between configurations

### Merging Configurations
1. Click "Auto-merge New ➔ Old" to merge new config into old config
2. Click "Auto-merge Old ➔ New" to merge old config into new config
3. If merge conflicts occur, detailed error messages will be displayed

### Export and Reset
1. Use "Export Old Config" to download the old configuration
2. Use "Export New Config" to download the new configuration
3. Click "Reset Old Config" to restore original old configuration
4. Click "Reset New Config" to restore original new configuration

### Error Handling
- Type mismatches and merge conflicts are displayed in a red error box
- Error messages include specific JSON paths where conflicts occur
- Click the '×' button to dismiss error messages

## Technologies Used

- React 18
- styled-components (UI Styling)
- React Ace (JSON Editor)
- Custom JSON merge utilities
- Advanced diff visualization

## Common Error Cases

The tool prevents and reports several types of merge conflicts:

1. Type Mismatches
```json
// Old Config
{ "ports": [80, 443] }
// New Config
{ "ports": "80,443" }
// Error: Type mismatch at 'ports' (array vs string)
```

2. Array-Object Conflicts
```json
// Old Config
{ "settings": [] }
// New Config
{ "settings": {} }
// Error: Cannot merge array with non-array at 'settings'
```

3. Invalid JSON
```json
// Old Config
{ "valid": "json" }
// New Config
{ invalid: json }
// Error: Invalid JSON syntax
