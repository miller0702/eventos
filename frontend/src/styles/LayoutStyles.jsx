import React from 'react';
import themeColors from "../utils/Colors";


const layoutStyles = (theme) => {
    const colors = themeColors[theme];
    return {
        layout:{
            backgroundColor:colors.background,
            display:'flex',
            height:'100vh'
        },
        appBar: {
            alignItems: 'center',
            backgroundColor:colors.background,
            boxShadow:'none',
        },
        toolbar: {
            ml: { xs: 0, sm: 30 },
            textAlign: 'center',
            padding: '0 16px',
            justifyContent:'space-between'
        },
        main: {
            flexGrow: 1,
            p: 3,
            mt: 8,
            ml: { xs: 0, sm: 30 },
            right:0,
            transition: 'margin 0.3s',
        },
        icon: {
            color: colors.primary,
            transition: 'transform 0.2s, font-size 0.2s',
            '&:hover': {
                transform: 'scale(1.1)',
                fontSize: '1.1rem',
            },
        },
        text: {
            color: colors.textSidebar,
            transition: 'transform 0.2s, font-size 0.2s',
            '&:hover': {
                transform: 'scale(1.1)',
                fontSize: '1.1rem',
            },
        },
        logoContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            flexDirection: 'column',
            margin: 10,
            borderRadius: 20        
        },
        logo: {
            width: '80%',
            objectFit: 'cover',
        },
    };
};

export default layoutStyles;
