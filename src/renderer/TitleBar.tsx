import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import './TitleBar.css';

const TitleBar = () => {
  return (
    <AppBar position="static" className="title-bar">
      <Toolbar variant="dense">
        <Typography variant="h6" className="draggable">
          My Custom Title Bar
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
