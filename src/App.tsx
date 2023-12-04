import React, { useState } from 'react';
import { Paper, Switch, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Posts from './components/Posts.tsx'

const App: React.FC = () => {
  // state to toggle dark/light mode
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // material-ui custom theme
  const appTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#3ABE61',
      },
      secondary: {
        main: '#c6c6c6',
      },
    },
  });

  //handle dark/light mode switch
  const handleChange = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const Header: React.FC = () => (
    <AppBar
      position="static"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '10px 30px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h7" sx={{ marginRight: '1rem' }}>
          {`${mode} mode`}
        </Typography>
        <Switch
          checked={mode !== 'light'}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
    </AppBar>
  );

  return (
      <ThemeProvider theme={appTheme}>
        <Paper
          elevation={0}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          square
        >
          <Header />
          <Typography variant="h3" sx={{ margin: '30px', textAlign: 'center' }}>
            Activity Feed
          </Typography>
          <Posts />
        </Paper>
      </ThemeProvider>
  );
};

export default App;
