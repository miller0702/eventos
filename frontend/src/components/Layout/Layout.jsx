import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import layoutStyles from '../../styles/LayoutStyles';
import { useTheme } from '../../context/ThemeContext';

const Layout = ({ children, mobileOpen, handleDrawerToggle }) => {
    const { theme, toggleTheme } = useTheme();
    const styles = layoutStyles(theme);
    
    return (
        <Box sx={styles.layout}>
            <AppBar position="fixed" style={styles.appBar}>
                <Toolbar sx={styles.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: styles.icon.color }}
                    >
                        <MenuIcon style={styles.icon} />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ color: styles.text.color }}>
                        Gestión de Eventos
                    </Typography>
                    <Switch
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        color="default"
                    />
                </Toolbar>
            </AppBar>
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={styles.main}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
