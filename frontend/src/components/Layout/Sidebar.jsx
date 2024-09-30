import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom'; // Importar Link
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const items = [
    { text: 'Home', icon: <HomeIcon />, path: '/dashboard' },
    { text: 'Eventos', icon: <EventIcon />, path: '/eventos' },
    { text: 'Asistentes', icon: <PeopleIcon />, path: '/asistentes' },
    { text: 'Promociones', icon: <CardGiftcardIcon />, path: '/promociones' },
    { text: 'Inscripciones', icon: <AssignmentIcon />, path: '/inscripciones' },
    { text: 'Usuarios', icon: <PeopleAltIcon />, path: '/usuarios' },
  ];

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <List>
          {items.map(({ text, icon, path }) => (
            <ListItem button key={text} component={Link} to={path} onClick={handleDrawerToggle}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
        open
      >
        <List>
          {items.map(({ text, icon, path }) => (
            <ListItem button key={text} component={Link} to={path}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
