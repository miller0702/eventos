import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import alertStyles from '../../styles/AlertsStyle';

const CustomAlert = ({ open, handleClose, message, severity }) => {
    const { theme } = useTheme();
    const styles = alertStyles(theme);

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ 
                    width: '100%', 
                    backgroundColor: styles.alert[severity].backgroundColor,
                    color: styles.alert[severity].color,
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomAlert;
