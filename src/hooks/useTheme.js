import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('jokestudio_theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const applyTheme = (themeValue) => {
      const root = document.documentElement;
      const body = document.body;
      
      if (themeValue === 'dark') {
        body.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
      } else if (themeValue === 'light') {
        body.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
      } else {
        // system theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          body.classList.add('dark');
        } else {
          body.classList.remove('dark');
        }
        root.setAttribute('data-theme', 'system');
      }
    };

    applyTheme(theme);
    localStorage.setItem('jokestudio_theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        const prefersDark = mediaQuery.matches;
        const body = document.body;
        
        if (prefersDark) {
          body.classList.add('dark');
        } else {
          body.classList.remove('dark');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => {
      if (currentTheme === 'system') return 'dark';
      if (currentTheme === 'dark') return 'light';
      return 'system';
    });
  };

  return { theme, setTheme, toggleTheme };
}