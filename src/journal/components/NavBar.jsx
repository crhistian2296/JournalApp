import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { startLogOut } from '../../store/auth/thunks';

const NavBar = ({ sidebarOpenSettings }) => {
  const dispatch = useDispatch();
  const { toggleIsOpen: openSidebar } = sidebarOpenSettings;

  const onLogout = () => {
    console.debug('logout');
    dispatch(startLogOut());
  };

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton
          color='inherit'
          onClick={openSidebar}
          edge='start'
          sx={{ mr: 2 }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h1' fontSize='40px' noWrap component='div'>
            JournalApp
          </Typography>
          <IconButton onClick={() => onLogout()} color='error'>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  sidebarOpenSettings: PropTypes.object.isRequired,
};

export default NavBar;
