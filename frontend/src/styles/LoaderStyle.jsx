import themeColors from "../utils/Colors";

const loaderStyles = (theme) => {
    const colors = themeColors[theme];
    return {
        loader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            flexDirection: 'column',
        },
        animacion: {
            height: 400,
            filter: 'drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))',
        },
        text: {
            color: colors.text,
            marginBottom: '20px',
            fontSize: '1.5rem',
        },
    };
};

export default loaderStyles;
