import { Close } from '@mui/icons-material';
import {
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

const SideBar = ({ drawerWidth = 240, sidebarOpenSettings }) => {
  const { displayName = '' } = useSelector(state => state.auth);
  const { notes } = useSelector(state => state.journal);
  const { isOpen, toggleIsOpen } = sidebarOpenSettings;

  const closeDrawer = () => {
    toggleIsOpen();
  };

  const capitalizedName =
    displayName.at(0).toUpperCase() + displayName.slice(1).trim();

  return (
    <Drawer
      variant='temporary'
      open={isOpen}
      onClose={toggleIsOpen}
      component='nav'
      ModalProps={Close}
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        display: { xs: 'block' },
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' noWrap component='div'>
          {capitalizedName}
        </Typography>
        <IconButton color='inherit' edge='start' onClick={closeDrawer}>
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
  );
};

SideBar.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
  sidebarOpenSettings: PropTypes.object.isRequired,
};

export default SideBar;
