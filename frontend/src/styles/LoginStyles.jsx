import themeColors from '../utils/Colors';
import backgroundImage from '../assets/img/login/bg-login.jpg';

const loginStyles = (theme) => {
  const colors = themeColors[theme];

  return {
    fondo: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
      width: '400px',
      padding: '40px',
      backgroundColor: colors.background,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      color: colors.text,
    },
    texto:{
      marginTop:100
    },
    form: {
      marginTop:20,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
    },
    button: {
      marginTop: '20px',
      backgroundColor: colors.buttonBackground,
      color: colors.buttonText,
      '&:hover':{
        backgroundColor: colors.secundary,
      }
    },
    textField: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: colors.inputBorder,
        },
        '&:hover fieldset': {
          borderColor: colors.inputHover,
        },
        '&.Mui-focused fieldset': {
          borderColor: colors.inputFocused,
        },
        backgroundColor: colors.inputBackground,
      },
      '& .MuiInputLabel-root': {
        color: colors.label,

        '& .Mui-focused label': {
        color: colors.label,
      },
      },
      '& .MuiInputBase-input': {
        color: colors.text,
      },
    },
    logo: {
      height: 200,
      top: 150,
      filter: 'drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))',
    }
    
  };
};

export default loginStyles;
