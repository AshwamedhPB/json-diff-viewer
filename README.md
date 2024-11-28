# JSON Diff-Viewer

A React-based tool for comparing, merging, and editing JSON files with advanced diff visualization and automatic merge capabilities.

## Features

- Side-by-side JSON comparison with visual diff highlighting
- Real-time JSON validation and formatting
- Automatic merge functionality:
  - Merge right JSON into left JSON (◀)
  - Merge left JSON into right JSON (▶)
- Smart conflict detection:
  - Type mismatch detection
  - Array-object conflict prevention
  - Detailed error reporting
- Export capabilities:
  - Export left JSON
  - Export right JSON
- Reset functionality:
  - Reset to original left JSON
  - Reset to original right JSON
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
1. The tool loads with default left and right JSON files
2. Edit JSON using the built-in editors
3. Changes are validated in real-time
4. Visual diff highlighting shows differences between JSON files

### Merging JSON Files
1. Click "◀ Auto-merge Right to Left" to merge right JSON into left JSON
2. Click "Auto-merge Left to Right ▶" to merge left JSON into right JSON
3. If merge conflicts occur, detailed error messages will be displayed

### Export and Reset
1. Use "Export Left JSON" to download the left JSON
2. Use "Export Right JSON" to download the right JSON
3. Click "Reset Left JSON" to restore original left JSON
4. Click "Reset Right JSON" to restore original right JSON

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
// Left JSON
{ "ports": [80, 443] }
// Right JSON
{ "ports": "80,443" }
// Error: Type mismatch at 'ports' (array vs string)
```

2. Array-Object Conflicts
```json
// Left JSON
{ "settings": [] }
// Right JSON
{ "settings": {} }
// Error: Cannot merge array with non-array at 'settings'
```

3. Invalid JSON
```json
// Left JSON
{ "valid": "json" }
// Right JSON
{ invalid: json }
// Error: Invalid JSON syntax
