import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('jokestudio_theme') || 'system';
  });

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
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          body.classList.add('dark');
        } else {
          body.classList.remove('dark');
        }
        root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      }
    };

    applyTheme(theme);
    localStorage.setItem('jokestudio_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = () => {
        const prefersDark = mediaQuery.matches;
        const root = document.documentElement;
        const body = document.body;

        if (prefersDark) {
          body.classList.add('dark');
        } else {
          body.classList.remove('dark');
        }
        root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'system';
      return 'light';
    });
  };

  return { theme, setTheme, toggleTheme };
}