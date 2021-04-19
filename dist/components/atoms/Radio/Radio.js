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
var react_1 = __importDefault(require("react"));
var check_icon_1 = __importDefault(require("../../_icons/check-icon"));
var helpers_1 = require("../../../utils/helpers");
var Radio = function (_a) {
    var label = _a.label, value = _a.value, node = _a.node, _b = _a.icon, icon = _b === void 0 ? true : _b, _c = _a.variant, variant = _c === void 0 ? 'accent' : _c, props = __rest(_a, ["label", "value", "node", "icon", "variant"]);
    /** Отображение иконки */
    var withIcon = icon ? (react_1.default.createElement("span", { className: "rf-radio__circle " + helpers_1.variantClass[variant] },
        react_1.default.createElement("span", { className: 'rf-radio__mark' },
            react_1.default.createElement(check_icon_1.default, null)))) : ('');
    return (react_1.default.createElement("label", { className: "rf-radio " + (props.className || '') + " " + (props.disabled ? 'disabled' : '') },
        react_1.default.createElement("input", __assign({}, props, { type: 'radio', className: 'rf-radio__input', value: value })),
        withIcon,
        react_1.default.createElement("span", { className: "rf-radio__label " + (node ? 'rf-radio__label--node' : '') }, node || label)));
};
exports.default = Radio;
