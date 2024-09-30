import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children, mobileOpen, handleDrawerToggle }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Título de la Aplicación
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: { xs: 7, sm: 8 },
          ml: { xs: 0, sm: 30 },
          transition: 'margin 0.3s',
        }}
      >
        {children}
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Layout;
