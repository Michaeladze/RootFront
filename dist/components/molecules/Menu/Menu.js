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
exports.MenuContext = void 0;
var react_1 = __importStar(require("react"));
var index_1 = require("../../../index");
var List_1 = __importDefault(require("../../atoms/List"));
/** Контекст для передачи функций работы с меню. */
exports.MenuContext = react_1.default.createContext({ onClose: function () { } });
var Menu = function (_a) {
    var list = _a.list, children = _a.children, content = _a.content, _b = _a.position, position = _b === void 0 ? 'left' : _b, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.relativeBlock, relativeBlock = _d === void 0 ? document.body : _d;
    /** Выпадающий список */
    var menuRef = react_1.useRef(null);
    var contentRef = react_1.useRef(null);
    var toggleRef = react_1.useRef(null);
    /** Флаг отображения выпадающего списка  */
    var _e = react_1.useState(false), show = _e[0], toggle = _e[1];
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
    var handleClickOutside = react_1.useCallback(function () {
        onClose();
    }, [toggle]);
    index_1.useClickOutside(menuRef, handleClickOutside);
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
    var _f = react_1.useState(clearCoordinates()), coordinates = _f[0], setCoordinates = _f[1];
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
    react_1.useLayoutEffect(function () {
        if (show) {
            rearrangePosition();
        }
        else {
            setCoordinates(clearCoordinates());
        }
    }, [show]);
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: "rf-menu " + className, ref: menuRef },
        react_1.default.createElement("div", { className: 'rf-menu__toggle', onClick: onClick, ref: toggleRef }, children),
        react_1.default.createElement("div", { className: "rf-menu__content " + (show ? 'rf-menu__content--show' : ''), style: coordinates, ref: contentRef },
            react_1.default.createElement(exports.MenuContext.Provider, { value: { onClose: onClose } }, content ? content : list && list.length > 0 && react_1.default.createElement(List_1.default, { list: list })))));
};
exports.default = Menu;
