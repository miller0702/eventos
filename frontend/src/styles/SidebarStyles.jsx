import themeColors from "../utils/Colors";

const sidebarStyles = (theme) => {
    const colors = themeColors[theme];
    return {
        drawerStatic: {
            backgroundColor: colors.background,
            display: {
                xs: 'none',
                sm: 'block',
            },
            '& .MuiDrawer-paper': {
                backgroundColor: colors.backgroundSidebar,
                boxSizing: 'border-box',
                width: 240,
            },
        },
        drawerToggle: {
            backgroundColor: colors.background,
            display: {
                xs: 'block',
                sm: 'none',
            },
            '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 240,
            },
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
            backgroundColor:colors.primary,
            flexDirection: 'column',
            margin:10,
            borderRadius:20        
        },
        logo: {
            width: '80%',
            objectFit:'cover',
        },
        userName: {
            color: colors.textButton,
            fontWeight: 'bold',
            backgroundColor:'#fff',
            width:'100%',
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20,
            textAlign:'center'
        },
        activeItem: {
            borderLeft: `4px solid ${colors.primary}`,
            backgroundColor: colors.activeBackground,
            color:'#fff'
        },
    };
};

export default sidebarStyles;
