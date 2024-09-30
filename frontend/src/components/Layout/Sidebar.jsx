import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Typography, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Perfil from '../../assets/img/logos/person.png';
import sidebarStyles from '../../styles/SidebarStyles';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const styles = sidebarStyles(theme);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const items = [
    { text: 'Home', icon: <HomeIcon />, path: '/dashboard' },
    { text: 'Eventos', icon: <EventIcon />, path: '/eventos' },
    { text: 'Asistentes', icon: <PeopleIcon />, path: '/asistentes' },
    { text: 'Promociones', icon: <CardGiftcardIcon />, path: '/promociones' },
    { text: 'Inscripciones', icon: <AssignmentIcon />, path: '/inscripciones' },
    { text: 'Usuarios', icon: <PeopleAltIcon />, path: '/usuarios' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={styles.drawerToggle}
      >
        <Box style={styles.logoContainer}>
          <img src={Perfil} alt="Perfil del Usuario" style={styles.logo} />
          <Typography variant="h6" style={styles.userName}>
            {currentUser?.name || 'Usuario'}
          </Typography>
        </Box>
        <List>
          {items.map(({ text, icon, path }) => (
            <ListItem
              button
              key={text}
              component={Link}
              to={path}
              onClick={handleDrawerToggle}
              sx={isActive(path) ? styles.activeItem : null}
            >
              <ListItemIcon style={styles.icon}>{icon}</ListItemIcon>
              <ListItemText primary={text} style={styles.text} />
            </ListItem>
          ))}
          <ListItem button key="Logout" onClick={handleLogout}>
            <ListItemIcon style={styles.icon}>
              <ExitToAppIcon style={styles.icon} />
            </ListItemIcon>
            <ListItemText primary="Logout" style={styles.text} />
          </ListItem>
        </List>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={styles.drawerStatic}
        open
      >
        <Box style={styles.logoContainer}> 
          <img src={Perfil} alt="Perfil del Usuario" style={styles.logo} />
          <Typography variant="h6" style={styles.userName}>
            {currentUser?.name || 'Usuario'}
          </Typography>
        </Box>
        <List>
          {items.map(({ text, icon, path }) => (
            <ListItem
              button
              key={text}
              component={Link}
              to={path}
              sx={isActive(path) ? styles.activeItem : null}
            >
              <ListItemIcon style={styles.icon}>{icon}</ListItemIcon>
              <ListItemText primary={text} style={styles.text} />
            </ListItem>
          ))}
          <ListItem button key="Logout" onClick={handleLogout}>
            <ListItemIcon style={styles.icon}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" style={styles.text} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
