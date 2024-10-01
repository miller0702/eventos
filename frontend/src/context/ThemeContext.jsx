import { createContext, useState, useContext, useEffect } from 'react';
import themeColors from '../utils/Colors'; // Asegúrate de que la ruta sea correcta

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const colors = themeColors[theme];

    Object.keys(colors).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, colors[key]);
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
