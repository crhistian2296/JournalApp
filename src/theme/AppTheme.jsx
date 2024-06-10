import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import PropTypes from 'prop-types';
import { blueTheme } from './blueTheme';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={blueTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

AppTheme.propTypes = {
  children: PropTypes.element,
};
