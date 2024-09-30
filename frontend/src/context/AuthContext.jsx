import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../services/clienteAxios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    const login = async ({ email, contraseña }) => {
        const response = await axios.post('/usuarios/login', { email, contraseña });
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ login, token, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
