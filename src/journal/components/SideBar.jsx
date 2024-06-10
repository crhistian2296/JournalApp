import { Close } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SideBarItem from './SideBarItem';

const SideBar = ({ drawerWidth = 240, setdrawerWidth }) => {
  const { displayName = '' } = useSelector(state => state.auth);
  const { notes } = useSelector(state => state.journal);

  const capitalizedName =
    displayName.at(0).toUpperCase() + displayName.slice(1).trim();

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            display: `${!drawerWidth ? 'none' : 'block'}`,
          },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h6' noWrap component='div'>
            {capitalizedName}
          </Typography>
          <IconButton
            color='inherit'
            edge='start'
            onClick={() => setdrawerWidth(() => 0)}
          >
            <Close />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {notes.map(note => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

SideBar.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
  setdrawerWidth: PropTypes.func.isRequired,
};

export default SideBar;
