"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("../../atoms/Button"));
var close_sm_1 = __importDefault(require("../../_icons/close-sm"));
var helpers_1 = require("../../../utils/helpers");
require("./Chips.scss");
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
    var chips = items.map(function (e) { return (react_1.default.createElement("div", { className: "rf-chips__item " + helpers_1.variantClass[variant] + " " + helpers_1.sizeClass[size] + " " + (disabled || e.disabled ? 'rf-chips__item--disabled' : '') + " " + className + " " + (onClick ? 'rf-chips__item--pointer' : ''), key: e.id, onClick: function (ev) { return handleClick(ev, e); } },
        react_1.default.createElement("span", { className: 'rf-chips__name', title: e.name }, e.name.length > 20 ? e.name.substr(0, 20) + "..." : e.name),
        onRemove && !disabled && !e.disabled && (react_1.default.createElement(Button_1.default, { className: 'rf-chips__button', buttonType: 'round', disabled: disabled, variant: variant, onClick: function (ev) { return handleRemove(ev, e.id); } },
            react_1.default.createElement(close_sm_1.default, null))))); });
    return react_1.default.createElement("div", { className: 'rf-chips' }, chips);
};
exports.default = Chips;
