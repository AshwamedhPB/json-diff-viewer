import React from 'react';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';

const AppHeader = ({ onCompareDiff }) => (
  <Header>
    <Box flex={true}
      justify='between'
      direction='row'
      responsive={false}
      pad={{ horizontal: 'medium' }}>
      <Title>JSON Diff Tool</Title>
      <Button label="Compare" onClick={onCompareDiff} primary={true} />
    </Box>
  </Header>
);

export default AppHeader;
