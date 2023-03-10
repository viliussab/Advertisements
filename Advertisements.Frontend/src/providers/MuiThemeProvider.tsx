import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a', // tailwind blue-900
    },
    secondary: {
      main: '#fff',
    },
    info: {
      main: '#374151', // tailwind gray-700
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

function MuiThemeProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MuiThemeProvider;
