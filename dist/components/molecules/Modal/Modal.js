"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./Modal.scss");
var react_dom_1 = require("react-dom");
var close_1 = __importDefault(require("../../_icons/close"));
var Modal = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, children = _a.children, onClose = _a.onClose, _c = _a.darkenBackground, darkenBackground = _c === void 0 ? true : _c, _d = _a.showClose, showClose = _d === void 0 ? true : _d, headerContent = _a.headerContent, footerContent = _a.footerContent, height = _a.height, _e = _a.disableScroll, disableScroll = _e === void 0 ? false : _e;
    /** Создаем контейнер для модалки */
    var div = react_1.useState(document.createElement('div'))[0];
    /** При маунте добавляем модалку. При дестрое - удаляем. */
    react_1.useEffect(function () {
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
    var modal = (react_1.default.createElement("div", { className: "rf-modal " + (darkenBackground ? 'rf-modal--darken' : ''), onClick: onClose },
        react_1.default.createElement("div", { style: style, className: "rf-modal__wrapper rf-modal__wrapper1 " + className, onClick: function (e) { return e.stopPropagation(); } },
            showClose && (react_1.default.createElement("button", { className: 'rf-modal__close-button', onClick: onClose },
                react_1.default.createElement(close_1.default, null))),
            headerContent && react_1.default.createElement("div", { className: 'rf-modal__header' }, headerContent),
            react_1.default.createElement("div", { style: { overflowY: disableScroll ? 'hidden' : 'auto' }, className: 'rf-modal__content' }, children),
            footerContent && react_1.default.createElement("div", { className: 'rf-modal__footer' }, footerContent))));
    return react_dom_1.createPortal(modal, div);
};
exports.default = Modal;
