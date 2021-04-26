"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Row = function (_a) {
    var children = _a.children, _b = _a.gap, gap = _b === void 0 ? 0 : _b, _c = _a.mb, mb = _c === void 0 ? 0 : _c, _d = _a.align, align = _d === void 0 ? 'top' : _d, _e = _a.justify, justify = _e === void 0 ? 'left' : _e, _f = _a.className, className = _f === void 0 ? '' : _f;
    var alignClass = '';
    switch (align) {
        case 'top':
            alignClass = 'rf-row--top';
            break;
        case 'middle':
            alignClass = 'rf-row--middle';
            break;
        case 'bottom':
            alignClass = 'rf-row--bottom';
            break;
        default:
            alignClass = '';
    }
    var justifyClass = '';
    switch (justify) {
        case 'left':
            justifyClass = 'rf-row--left';
            break;
        case 'center':
            justifyClass = 'rf-row--center';
            break;
        case 'right':
            justifyClass = 'rf-row--right';
            break;
        case 'between':
            justifyClass = 'rf-row--between';
            break;
        case 'around':
            justifyClass = 'rf-row--around';
            break;
        default:
            justifyClass = '';
    }
    return (react_1.default.createElement("div", { className: "rf-row " + alignClass + " " + justifyClass + " " + className, style: { margin: "0 -" + gap + "px " + mb + "px" } }, children));
};
exports.default = Row;
