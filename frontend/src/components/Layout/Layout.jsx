// src/components/Layout/Layout.js
import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar'; // Asegúrate de que la ruta sea correcta

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
            sx={{ mr: 2, display: { sm: 'none' } }} // Solo mostrar en pantallas pequeñas
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
          p: 3, // Relleno alrededor del contenido
          mt: 8, // Margen superior para el contenido principal debajo del AppBar
          ml: { xs: 0, sm: 30 }, // Margen izquierdo para que no quede detrás del Drawer en pantallas grandes
          transition: 'margin 0.3s', // Transición suave para el margen
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
