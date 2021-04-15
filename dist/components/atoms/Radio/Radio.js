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
import CheckIcon from '../../_icons/check-icon';
import { variantClass } from '../../../utils/helpers';
var Radio = function (_a) {
    var label = _a.label, value = _a.value, node = _a.node, _b = _a.icon, icon = _b === void 0 ? true : _b, _c = _a.variant, variant = _c === void 0 ? 'accent' : _c, props = __rest(_a, ["label", "value", "node", "icon", "variant"]);
    /** Отображение иконки */
    var withIcon = icon ? (React.createElement("span", { className: "rf-radio__circle " + variantClass[variant] },
        React.createElement("span", { className: 'rf-radio__mark' },
            React.createElement(CheckIcon, null)))) : ('');
    return (React.createElement("label", { className: "rf-radio " + (props.className || '') + " " + (props.disabled ? 'disabled' : '') },
        React.createElement("input", __assign({}, props, { type: 'radio', className: 'rf-radio__input', value: value })),
        withIcon,
        React.createElement("span", { className: "rf-radio__label " + (node ? 'rf-radio__label--node' : '') }, node || label)));
};
export default Radio;
