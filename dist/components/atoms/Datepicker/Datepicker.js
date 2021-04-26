"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
// @ts-ignore
var entry_nostyle_1 = __importDefault(require("react-date-picker/dist/entry.nostyle"));
var calendar_outline_1 = __importDefault(require("../../_icons/calendar-outline"));
var close_1 = __importDefault(require("../../_icons/close"));
var helpers_1 = require("../../../utils/helpers");
require("./Datepicker.scss");
var Datepicker = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 'medium' : _b, _c = _a.showLeadingZeros, showLeadingZeros = _c === void 0 ? true : _c, props = __rest(_a, ["size", "showLeadingZeros"]);
    var _d = react_1.useState(props.value || null), value = _d[0], setValue = _d[1];
    /** Изменение значения календаря */
    var handleChange = function (date) {
        var d = date;
        setValue(d);
        props.onChange && props.onChange(d, props.name || '');
    };
    return (react_1.default.createElement("div", { className: "rf-datepicker__wrapper " + helpers_1.sizeClass[size] },
        react_1.default.createElement(entry_nostyle_1.default, __assign({}, props, { value: value, format: 'dd.MM.y', locale: 'ru-RU', showLeadingZeros: showLeadingZeros, calendarIcon: react_1.default.createElement(calendar_outline_1.default, null), clearIcon: props.clear && !props.disabled && value ? react_1.default.createElement(close_1.default, null) : null, onChange: handleChange }))));
};
exports.default = Datepicker;
