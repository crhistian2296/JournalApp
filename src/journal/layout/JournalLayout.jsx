import { Box, Toolbar } from '@mui/material';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { useState } from 'react';

const JournalLayout = ({ children }) => {
  const [drawerWidth, setdrawerWidth] = useState(240);

  return (
    <Box
      display='flex'
      className='animate__animated animate__fadeIn animate__faster'
    >
      <NavBar drawerWidth={drawerWidth} setdrawerWidth={setdrawerWidth} />

      <SideBar drawerWidth={drawerWidth} setdrawerWidth={setdrawerWidth} />

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
