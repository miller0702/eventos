// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import { routes } from './services/routes';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Layout/Dashboard';
import Footer from './components/Layout/Footer';

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
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}>
                    <Dashboard />
                    <Footer />
                  </Layout>
                </ProtectedRoute>
              }
            />
            {routes.map(({ path, component: Component }, index) => (
              <Route
                key={index}
                path={path}
                element={
                  <ProtectedRoute>
                    <Layout mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}>
                      <Component />
                      <Footer />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            ))}
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
