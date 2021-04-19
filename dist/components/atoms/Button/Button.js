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
var helpers_1 = require("../../../utils/helpers");
var Button = function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'button' : _b, _c = _a.size, size = _c === void 0 ? 'medium' : _c, _d = _a.buttonType, buttonType = _d === void 0 ? 'primary' : _d, _e = _a.variant, variant = _e === void 0 ? buttonType === 'text' ? 'base' : 'accent' : _e, props = __rest(_a, ["type", "size", "buttonType", "variant"]);
    var classesMap = {
        primary: 'rf-button--primary',
        secondary: 'rf-button--secondary',
        link: 'rf-button--link',
        outlinePrimary: 'rf-button--outline-primary',
        outlineSecondary: 'rf-button--outline-secondary',
        text: 'rf-button--text',
        round: 'rf-button--round'
    };
    return (react_1.default.createElement("button", __assign({}, props, { type: type, className: "rf-button " + classesMap[buttonType] + " " + helpers_1.sizeClass[size] + " " + helpers_1.variantClass[variant] + " " + (props.className || '') }), props.children));
};
exports.default = Button;
