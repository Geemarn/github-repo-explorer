import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';
import Index from './app';
import './index.css';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2b9cdb',
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
