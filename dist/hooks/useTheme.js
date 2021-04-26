"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * Применение цветовой схемы.
 * На body вешается класс с именем темы в названии.
 * Если темы нет, применяется дефолтная тема.
 * @param {string} theme - Цветовая схема
 *
 */
var useTheme = function (theme) {
    react_1.useEffect(function () {
        if (theme) {
            document.body.className = "theme-" + theme;
            localStorage.setItem('theme', theme);
        }
        else {
            document.body.className = 'theme-default';
            localStorage.setItem('theme', 'default');
        }
    }, [theme]);
};
exports.default = useTheme;
