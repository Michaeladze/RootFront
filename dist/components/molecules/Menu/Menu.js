import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../../index';
import List from '../../atoms/List';
/** Контекст для передачи функций работы с меню. */
export var MenuContext = React.createContext({ onClose: function () { } });
var Menu = function (_a) {
    var list = _a.list, children = _a.children, content = _a.content, _b = _a.position, position = _b === void 0 ? 'left' : _b, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.relativeBlock, relativeBlock = _d === void 0 ? document.body : _d;
    /** Выпадающий список */
    var menuRef = useRef(null);
    var contentRef = useRef(null);
    var toggleRef = useRef(null);
    /** Флаг отображения выпадающего списка  */
    var _e = useState(false), show = _e[0], toggle = _e[1];
    /** Клик по кнопке */
    var onClick = function (e) {
        e.preventDefault();
        onToggle();
    };
    /** Изменение состояния выпадающего списка */
    var onToggle = function () {
        toggle(!show);
    };
    var onClose = function () {
        toggle(false);
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Функция для отслеживания клика вне элемента */
    var handleClickOutside = useCallback(function () {
        onClose();
    }, [toggle]);
    useClickOutside(menuRef, handleClickOutside);
    // -------------------------------------------------------------------------------------------------------------------
    var clearCoordinates = function () {
        return position === 'left' ?
            {
                top: '-99999px',
                left: '0',
                right: 'auto'
            } :
            {
                top: '-99999px',
                left: 'auto',
                right: '0'
            };
    };
    var _f = useState(clearCoordinates()), coordinates = _f[0], setCoordinates = _f[1];
    /** Пересчитываем координаты, если не помещается*/
    var rearrangePosition = function () {
        if (contentRef.current && toggleRef.current) {
            var toggleRect = toggleRef.current.getBoundingClientRect();
            var listRect = contentRef.current.getBoundingClientRect();
            var left = 0;
            var right = 0;
            var top_1 = toggleRect.height;
            var minGap = 10;
            if (toggleRect.height + toggleRect.top + listRect.height > relativeBlock.offsetHeight) {
                top_1 =
                    toggleRect.height -
                        (toggleRect.height + toggleRect.top + listRect.height - relativeBlock.offsetHeight) -
                        minGap;
            }
            if (position === 'left') {
                if (toggleRect.left + listRect.width > relativeBlock.offsetWidth) {
                    left = relativeBlock.offsetWidth - listRect.width - toggleRect.left - minGap;
                }
                setCoordinates({
                    left: left + "px",
                    top: top_1 + "px",
                    right: 'auto'
                });
            }
            else {
                if (listRect.left < 0) {
                    right = listRect.left - minGap;
                }
                setCoordinates({
                    left: 'auto',
                    top: top_1 + "px",
                    right: right + "px"
                });
            }
        }
    };
    useLayoutEffect(function () {
        if (show) {
            rearrangePosition();
        }
        else {
            setCoordinates(clearCoordinates());
        }
    }, [show]);
    // -------------------------------------------------------------------------------------------------------------------
    return (React.createElement("div", { className: "rf-menu " + className, ref: menuRef },
        React.createElement("div", { className: 'rf-menu__toggle', onClick: onClick, ref: toggleRef }, children),
        React.createElement("div", { className: "rf-menu__content " + (show ? 'rf-menu__content--show' : ''), style: coordinates, ref: contentRef },
            React.createElement(MenuContext.Provider, { value: { onClose: onClose } }, content ? content : list && list.length > 0 && React.createElement(List, { list: list })))));
};
export default Menu;
