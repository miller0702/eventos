import { Height } from "@mui/icons-material";
import themeColors from "../utils/Colors";
import zIndex from "@mui/material/styles/zIndex";
import { display, height } from "@mui/system";

const modalStyles = (theme) => {
    const colors = themeColors[theme];
    return {
        modal: {
            backgroundColor: colors.background,
            color: colors.text,
            position: 'relative',
        },
        text: {
            color: colors.text,
        },
        button: {
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontWeight: 'bold',
        },
        img: {
            position: 'absolute',
            display: 'flex',
            zIndex: 1,
            right: 10,
            bottom:0,
            width: 150,
            height: 150,
            filter: 'drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))',
        },
        buttonError: {
            backgroundColor: colors.error,
            color: '#fff',
            hoverBackgroundColor: colors.error,
            fontWeight: 'bold',
        },
        buttonPrimary: {
            backgroundColor: colors.primary,
            color: colors.buttonText,
            hoverBackgroundColor: colors.primary,
            fontWeight: 'bold',
        },
        buttonSecondary: {
            backgroundColor: colors.secundary,
            color: colors.buttonText,
            hoverBackgroundColor: colors.secundary,
            fontWeight: 'bold',
        },
    };
};


export default modalStyles;
