import { useEffect } from 'react';
var useClickOutside = function (node, handler) {
    /** Функция для отслеживания клика вне элемента */
    var handleClickOutside = function (event) {
        /** Если кликнули по элементу или элементам внутри него - ничего не делаем */
        if (node && node.current && node.current.contains(event.target)) {
            return;
        }
        handler();
    };
    /** Вешаем eventListener на клик по текущему компоненту */
    useEffect(function () {
        document.addEventListener('click', handleClickOutside);
        return function () {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handler]);
};
export default useClickOutside;
