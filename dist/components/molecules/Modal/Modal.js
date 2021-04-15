import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Close from '../../_icons/close';
var Modal = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, children = _a.children, onClose = _a.onClose, _c = _a.darkenBackground, darkenBackground = _c === void 0 ? true : _c, _d = _a.showClose, showClose = _d === void 0 ? true : _d, headerContent = _a.headerContent, footerContent = _a.footerContent, height = _a.height, _e = _a.disableScroll, disableScroll = _e === void 0 ? false : _e;
    /** Создаем контейнер для модалки */
    var div = useState(document.createElement('div'))[0];
    /** При маунте добавляем модалку. При дестрое - удаляем. */
    useEffect(function () {
        /** Закрывает модалку при нажатии на Escape */
        var closeOnEscPress = function (e) {
            if (e.key === 'Escape' && onClose) {
                onClose();
            }
        };
        document.body.appendChild(div);
        document.body.style.overflowY = 'hidden';
        window.addEventListener('keyup', closeOnEscPress);
        return function () {
            document.body.style.overflowY = 'auto';
            document.body.removeChild(div);
            window.removeEventListener('keyup', closeOnEscPress);
        };
    });
    var style = height ? { height: height } : {};
    /** Обертка для модалки */
    var modal = (React.createElement("div", { className: "rf-modal " + (darkenBackground ? 'rf-modal--darken' : ''), onClick: onClose },
        React.createElement("div", { style: style, className: "rf-modal__wrapper rf-modal__wrapper1 " + className, onClick: function (e) { return e.stopPropagation(); } },
            showClose && (React.createElement("button", { className: 'rf-modal__close-button', onClick: onClose },
                React.createElement(Close, null))),
            headerContent && React.createElement("div", { className: 'rf-modal__header' }, headerContent),
            React.createElement("div", { style: { overflowY: disableScroll ? 'hidden' : 'auto' }, className: 'rf-modal__content' }, children),
            footerContent && React.createElement("div", { className: 'rf-modal__footer' }, footerContent))));
    return createPortal(modal, div);
};
export default Modal;
