import { useEffect } from 'react';

/**
 * Применение цветовой схемы.
 * На body вешается класс с именем темы в названии.
 * Если темы нет, применяется дефолтная тема.
 * @param {string} theme - Цветовая схема
 *
 */
const useTheme = (theme?: string) => {
  useEffect(() => {
    if (theme) {
      document.body.className = `theme-${theme}`;
      localStorage.setItem('theme', theme);
    } else {
      document.body.className = 'theme-default';
      localStorage.setItem('theme', 'default');
    }
  }, [theme]);
};

export default useTheme;
