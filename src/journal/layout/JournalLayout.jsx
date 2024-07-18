import { Box, Toolbar } from '@mui/material';
import PropTypes from 'prop-types';
import { useReducer } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const JournalLayout = ({ children }) => {
  const drawerWidth = 240;
  const [isOpen, toggleIsOpen] = useReducer(state => !state, false);

  return (
    <Box
      display='flex'
      className='animate__animated animate__fadeIn animate__faster'
    >
      <NavBar sidebarOpenSettings={{ isOpen, toggleIsOpen }} />

      <SideBar
        drawerWidth={drawerWidth}
        sidebarOpenSettings={{ isOpen, toggleIsOpen }}
      />

      <Box component='main' flexGrow={1} p={3} justifyContent={'space-between'}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default JournalLayout;

JournalLayout.propTypes = {
  children: PropTypes.array,
};
