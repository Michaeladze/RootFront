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
var timeData_1 = require("./timeData");
var Button_1 = __importDefault(require("../Button"));
var angle_down_1 = __importDefault(require("../../_icons/angle-down"));
var Menu_1 = require("../../molecules/Menu/Menu");
require("./TimeElement.scss");
var TimeElement = function (_a) {
    var updateTime = _a.updateTime, min = _a.min, max = _a.max, value = _a.value;
    var _b = react_1.useState(null), time = _b[0], setTime = _b[1];
    var _c = react_1.useState(false), translate = _c[0], setTranslate = _c[1];
    react_1.useEffect(function () {
        if (value) {
            setTime(value.split(':')[0]);
        }
    }, [value]);
    var clickHandler = function (event) {
        setTime(event.currentTarget.innerText.split(':')[0]);
        setTranslate(true);
    };
    var applyTimeHandler = function (event, onClose) {
        updateTime(event.currentTarget.innerText);
        setTranslate(false);
        onClose();
    };
    // -------------------------------------------------------------------------------------------------------------------
    var minH = react_1.useMemo(function () { return min.split(':'); }, [min])[0];
    var maxH = react_1.useMemo(function () { return max.split(':'); }, [max])[0];
    /** Сравнение времени */
    var isValidTime = function (time, flag) {
        var _a = time.split(':'), h = _a[0], m = _a[1];
        if (flag === 'h') {
            return h >= minH && h <= maxH;
        }
        var cur = h + m;
        var minStr = min.replace(':', '');
        var maxStr = max.replace(':', '');
        return cur >= minStr && cur <= maxStr;
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Ячейки с часами */
    var itemsHour = timeData_1.arrayTimeHours.map(function (itemRow, id) { return (react_1.default.createElement("div", { key: id, className: 'rf-time-element__item-row' }, itemRow.map(function (item) { return (react_1.default.createElement(Button_1.default, { buttonType: 'text', key: item, disabled: !isValidTime(item, 'h'), className: 'rf-time-element', onClick: clickHandler }, item)); }))); });
    var onClose = react_1.useContext(Menu_1.MenuContext).onClose;
    /** Ячейки с минутами */
    var itemsMinutes = timeData_1.arrayTimeMinutes.map(function (itemRow, id) { return (react_1.default.createElement("div", { key: id, className: 'rf-time-element__item-row' }, itemRow.map(function (item) {
        var t = (time || '00') + item;
        return (react_1.default.createElement(Button_1.default, { buttonType: 'text', key: item, disabled: !isValidTime(t, 'm'), className: 'rf-time-element', onClick: function (e) { return applyTimeHandler(e, onClose); } }, t));
    }))); });
    return (react_1.default.createElement("div", { className: 'rf-time-element__wrapper' },
        react_1.default.createElement("div", { className: "rf-time-element__translate " + (translate ? 'element__translate--active' : '') },
            react_1.default.createElement("div", { className: 'rf-time-element__column' },
                react_1.default.createElement("div", { className: 'rf-time-element__header-container' },
                    react_1.default.createElement("div", { className: 'rf-time-element__name' }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0447\u0430\u0441")),
                itemsHour),
            react_1.default.createElement("div", { className: 'rf-time-element__column' },
                react_1.default.createElement("div", { className: 'rf-time-element__header-container' },
                    react_1.default.createElement(Button_1.default, { style: { paddingRight: '4px' }, onClick: function () { return setTranslate(false); }, buttonType: 'text' },
                        react_1.default.createElement(angle_down_1.default, { className: 'rf-time-element__icon' })),
                    react_1.default.createElement("div", { className: 'rf-time-element__name' }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0438\u043D\u0443\u0442\u044B")),
                itemsMinutes))));
};
exports.default = TimeElement;
