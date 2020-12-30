import { RefObject, useEffect } from 'react';

const useClickOutside = (node: RefObject<HTMLElement>, handler: () => void) => {
  /** Функция для отслеживания клика вне элемента */
  const handleClickOutside = (event: MouseEvent) => {
    /** Если кликнули по элементу или элементам внутри него - ничего не делаем */
    if (node && node.current && node.current.contains(event.target as HTMLElement)) {
      return;
    }

    handler();
  };

  /** Вешаем eventListener на клик по текущему компоненту */
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handler]);
};

export default useClickOutside;
