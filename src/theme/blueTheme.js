import { createTheme } from '@mui/material/';
import { red } from '@mui/material/colors';

export const blueTheme = createTheme({
  palette: {
    primary: {
      main: '#3e5aa3',
    },
    secondary: {
      main: '#2f457c',
    },
    error: {
      main: red[600],
    },
  },
});
