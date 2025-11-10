import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets CSS for consistency */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);