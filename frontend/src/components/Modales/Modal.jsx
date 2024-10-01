import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import modalStyles from '../../styles/ModalSyles';

const Modal = ({ open, title, content, actions, handleClose }) => {
  const { theme } = useTheme();
  const styles = modalStyles(theme);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box style={{ position: 'relative', overflow: 'visible' }}>
        <DialogTitle style={styles.modal}>{title}</DialogTitle>
        <DialogContent dividers style={styles.modal}>
          {content}
        </DialogContent>
        {actions && (
          <DialogActions style={styles.modal} sx={{ justifyContent: 'center' }}>
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                color={action.color || 'primary'}
                variant={action.variant || 'contained'}
                sx={{
                  ...(action.color === 'error' && {
                    backgroundColor: styles.buttonError.backgroundColor,
                    color: styles.buttonError.color,
                    fontWeight: styles.buttonError.fontWeight,
                    '&:hover': {
                      backgroundColor: styles.buttonError.hoverBackgroundColor,
                    },
                  }),
                  ...(action.color === 'primary' && {
                    backgroundColor: styles.buttonPrimary.backgroundColor,
                    color: styles.buttonPrimary.color,
                    fontWeight: styles.buttonPrimary.fontWeight,
                    '&:hover': {
                      backgroundColor: styles.buttonPrimary.hoverBackgroundColor,
                    },
                  }),
                  ...(action.color === 'secondary' && {
                    backgroundColor: styles.buttonSecondary.backgroundColor,
                    color: styles.buttonSecondary.color,
                    fontWeight: styles.buttonSecondary.fontWeight,
                    '&:hover': {
                      backgroundColor: styles.buttonSecondary.hoverBackgroundColor,
                    },
                  }),
                }}
              >
                {action.label}
              </Button>
            ))}
          </DialogActions>
        )}

      </Box>
    </Dialog>
  );
};

export default Modal;
