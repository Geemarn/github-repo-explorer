import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';
import Index from './app';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2b9cdb',
    },
    secondary: {
      main: '#f2f2f2',
      dark: '#e0e0e0',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Index />
    </ThemeProvider>
  </StrictMode>,
);
