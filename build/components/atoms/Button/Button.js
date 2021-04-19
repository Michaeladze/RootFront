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
import React from 'react';
import { sizeClass, variantClass } from '../../../utils/helpers';
import './Button.scss';
var Button1 = function (_a) {
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
    return (React.createElement("button", __assign({}, props, { type: type, className: "rf-button " + classesMap[buttonType] + " " + sizeClass[size] + " " + variantClass[variant] + " " + (props.className || '') }), props.children));
};
export default Button1;
//# sourceMappingURL=Button.js.map