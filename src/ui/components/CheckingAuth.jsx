import { CircularProgress, Grid } from '@mui/material';

export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
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
          width: 'fit-content',
        }}
      >
        <CircularProgress color='secondary' />
      </Grid>
    </Grid>
  );
};
