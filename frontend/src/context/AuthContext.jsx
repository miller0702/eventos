import React, { createContext, useState, useContext } from 'react';
import axios from '../services/clienteAxios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
    const [userPhone, setUserPhone] = useState(() => localStorage.getItem('userPhone') || '');

    const login = async ({ email, contraseña }) => {
        try {
            const response = await axios.post('/usuarios/login', { email, contraseña });
            const { token, nombre, telefono } = response.data;
            
            setToken(token);
            setUserName(nombre);
            setUserPhone(telefono);

            localStorage.setItem('token', token);
            localStorage.setItem('userName', nombre);
            localStorage.setItem('userPhone', telefono);

        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
        }
    };

    const logout = () => {
        setToken(null);
        setUserName('');
        setUserPhone('');
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userPhone');
    };

    return (
        <AuthContext.Provider value={{ login, token, userName, userPhone, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
