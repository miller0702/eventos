import React from 'react';
import { Box, Typography } from '@mui/material';
import loaderStyles from '../../styles/LoaderStyle';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/Loader.scss'

const Loader = () => {
    const { theme } = useTheme();
    const styles = loaderStyles(theme);

    return (
        <Box style={styles.loader}>
            <Typography style={styles.text}>Cargando...</Typography>
            <div className="loader">
                <div className="box box0">
                    <div></div>
                </div>
                <div className="box box1">
                    <div></div>
                </div>
                <div className="box box2">
                    <div></div>
                </div>
                <div className="box box3">
                    <div></div>
                </div>
                <div className="box box4">
                    <div></div>
                </div>
                <div className="box box5">
                    <div></div>
                </div>
                <div className="box box6">
                    <div></div>
                </div>
                <div className="box box7">
                    <div></div>
                </div>
                <div className="ground">
                    <div></div>
                </div>
            </div>
        </Box>
    );
};

export default Loader;
