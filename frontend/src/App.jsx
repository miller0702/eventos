import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import { routes } from './services/routes';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Layout/Dashboard';
import { Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/" element={<Layout mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />}>
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
              />
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={
                  <ProtectedRoute>
                    <Box>{route.text}</Box>
                  </ProtectedRoute>
                }
                />
              ))}
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
