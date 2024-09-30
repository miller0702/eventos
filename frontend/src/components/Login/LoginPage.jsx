import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import loginStyles from '../../styles/LoginStyles';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/img/login/logo.png';

const LoginPage = () => {
    const { theme, toggleTheme } = useTheme();
    const styles = loginStyles(theme);
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, contraseña });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <Box style={styles.fondo}>
            <Box sx={styles.container}>
                <img src={Logo} alt="Logo de la Plataforma" style={styles.logo}/>
                <Typography variant="h4" align="center">Iniciar Sesión</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={styles.textField}
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        sx={styles.textField}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={styles.button}>
                        Iniciar Sesión
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default LoginPage;
