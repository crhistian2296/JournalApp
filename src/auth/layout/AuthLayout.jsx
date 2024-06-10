import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: 'primary.main',
        padding: 4,
      }}
    >
      <Grid
        container
        className='box-shadow'
        sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          maxWidth: '420px',
        }}
      >
        <Typography variant='h5' mb={1}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};

export default AuthLayout;
