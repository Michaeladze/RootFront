import React from 'react';
import Button from '../../atoms/Button';
import Close from '../../_icons/close-sm';
import { sizeClass, variantClass } from '../../../utils/helpers';
var Chips = function (_a) {
    var items = _a.items, _b = _a.variant, variant = _b === void 0 ? 'base' : _b, _c = _a.size, size = _c === void 0 ? 'medium' : _c, onRemove = _a.onRemove, onClick = _a.onClick, className = _a.className, disabled = _a.disabled;
    var handleRemove = function (e, id) {
        e.stopPropagation();
        e.preventDefault();
        onRemove && onRemove(id);
    };
    var handleClick = function (e, c) {
        e.preventDefault();
        onClick && onClick(c);
    };
    var chips = items.map(function (e) { return (React.createElement("div", { className: "rf-chips__item " + variantClass[variant] + " " + sizeClass[size] + " " + (disabled || e.disabled ? 'rf-chips__item--disabled' : '') + " " + className + " " + (onClick ? 'rf-chips__item--pointer' : ''), key: e.id, onClick: function (ev) { return handleClick(ev, e); } },
        React.createElement("span", { className: 'rf-chips__name', title: e.name }, e.name.length > 20 ? e.name.substr(0, 20) + "..." : e.name),
        onRemove && !disabled && !e.disabled && (React.createElement(Button, { className: 'rf-chips__button', buttonType: 'round', disabled: disabled, variant: variant, onClick: function (ev) { return handleRemove(ev, e.id); } },
            React.createElement(Close, null))))); });
    return React.createElement("div", { className: 'rf-chips' }, chips);
};
export default Chips;
