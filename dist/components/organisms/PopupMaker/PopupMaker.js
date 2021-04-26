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
exports.openPopup = exports.popups$$ = void 0;
var react_1 = __importStar(require("react"));
require("./PopupMaker.scss");
var rxjs_1 = require("rxjs");
var Modal_1 = __importDefault(require("../../molecules/Modal"));
/** Стак попапов */
exports.popups$$ = new rxjs_1.BehaviorSubject([]);
/** Закрываем последний открытый попап */
var onClose = function () {
    exports.popups$$.next(exports.popups$$.getValue().slice(0, -1));
};
/** Основная функция добавления попапа в стек */
var openPopup = function (component, modalClass) {
    if (modalClass === void 0) { modalClass = ''; }
    var componentModal = (react_1.default.createElement(Modal_1.default, { className: modalClass, key: exports.popups$$.getValue().length, onClose: onClose }, react_1.default.cloneElement(component, { onClose: onClose }, [])));
    exports.popups$$.next(exports.popups$$.getValue().concat([componentModal]));
};
exports.openPopup = openPopup;
var PopupMaker = function () {
    var _a = react_1.useState([]), modalComponent = _a[0], setModalComponent = _a[1];
    /** Подписываемся на стек попапов*/
    react_1.useEffect(function () {
        if (exports.popups$$.closed) {
            exports.popups$$ = new rxjs_1.BehaviorSubject([]);
        }
        exports.popups$$.subscribe(function (data) {
            setModalComponent(data);
        });
        return function () { return exports.popups$$.unsubscribe(); };
    }, []);
    return react_1.default.createElement(react_1.default.Fragment, null, modalComponent);
};
exports.default = PopupMaker;
