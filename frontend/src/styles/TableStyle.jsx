import themeColors from "../utils/Colors";

const tableStyles = (theme) => {
    const colors = themeColors[theme];
    return {
        pages: {
            marginTop: '5%',
            backgroundColor: colors.background,
        },

        text: {
            color: colors.text,
        },

        textField: {
            borderRadius: '30px',
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
                color: colors.text,
                '&.Mui-focused': {
                    color: colors.text
                },
            },
            '& .MuiInputBase-input': {
                color: colors.text,
            },
            width:'100%'
        },

        table: {
            '& .MuiDataGrid-columnHeader': {
                backgroundColor: colors.backgroundSidebar,
                color: 'white',
                fontWeight: 'bold'
            },

            '& .MuiDataGrid-cell': {
                color: colors.text,
            },
            '& .MuiDataGrid-footerContainer': {
                backgroundColor: colors.background,
                color: colors.textSidebar
            },
            '& .MuiTablePagination-root': {
                color: colors.textSidebar
            }
        },

        button: {
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontWeight: 'bold',
        },

        iconButton: {
            color: colors.primary,
        },

        footerBackground: {
            backgroundColor: colors.background
        },

        footerTextColor: {
            color: colors.textSidebar
        },
    };
};

export default tableStyles;
