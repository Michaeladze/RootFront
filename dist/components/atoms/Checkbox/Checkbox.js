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
import MinusIcon from '../../_icons/minus';
var Checkbox = function (_a) {
    var label = _a.label, value = _a.value, node = _a.node, _b = _a.icon, icon = _b === void 0 ? true : _b, _c = _a.variant, variant = _c === void 0 ? 'accent' : _c, _d = _a.align, align = _d === void 0 ? 'flex-start' : _d, _e = _a.halfChecked, halfChecked = _e === void 0 ? false : _e, props = __rest(_a, ["label", "value", "node", "icon", "variant", "align", "halfChecked"]);
    /** Отображение иконки */
    var checkIcon = !halfChecked && icon && (React.createElement("span", { className: "rf-checkbox__check " + variantClass[variant] + " " + (node ? 'rf-checkbox__check--node' : '') },
        React.createElement("span", { className: 'rf-checkbox__mark' },
            React.createElement(CheckIcon, null))));
    /** Иконка полу-чека */
    var halfCheckIcon = halfChecked && icon && (React.createElement("span", { className: "rf-checkbox__half-check " + variantClass[variant] },
        React.createElement(MinusIcon, null)));
    var disabledClass = props.disabled ? 'disabled' : '';
    var alignClass = {
        'flex-start': 'rf-checkbox--flex-start',
        'center': 'rf-checkbox--center',
        'flex-end': 'rf-checkbox--flex-end',
    };
    var showIconClass = icon ? '' : 'rf-checkbox__label--no-icon';
    return (React.createElement("label", { className: "rf-checkbox " + (props.className || '') + " " + disabledClass + " " + alignClass[align] },
        React.createElement("input", __assign({}, props, { type: 'checkbox', className: 'rf-checkbox__input', value: value })),
        checkIcon,
        halfCheckIcon,
        label && React.createElement("div", { className: "rf-checkbox__label " + (node ? 'rf-checkbox__label--node' : '') + " " + showIconClass }, node || label)));
};
export default Checkbox;
