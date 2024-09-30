import themeColors from "../utils/Colors";

const alertStyles = (theme) => {
    const colors = themeColors[theme];
    return {
        alert: {
            success: {
                backgroundColor: colors.succes,
                color: colors.textButton,              
            },
            error: {
                backgroundColor: colors.error,    
                color: colors.text,               
            },
            warning: {
                backgroundColor: colors.warning,  
                color: colors.text,               
            },
            info: {
                backgroundColor: colors.info,     
                color: colors.text,               
            },
        },
    };
};

export default alertStyles;
