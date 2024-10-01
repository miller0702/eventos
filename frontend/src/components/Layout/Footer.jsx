import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#333',
        color: 'white',
        textAlign: 'center',
        paddingBlock: 2,
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2">&copy; 2024 Eventos - Miller Alvarez. Todos los derechos reservados.</Typography>
    </Box>
  );
};

export default Footer;
