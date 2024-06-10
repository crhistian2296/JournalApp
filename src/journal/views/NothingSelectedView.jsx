import { StarOutline } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      className='animate__animated animate__fadeIn animate__faster'
      sx={{
        minHeight: 'calc(100vh - 115px)',
        backgroundColor: 'primary.main',
        borderRadius: 3,
        padding: 4,
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color='white' variant='h5' align='center'>
          Select or create an entry
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NothingSelectedView;

NothingSelectedView.ProtTypes = {};
