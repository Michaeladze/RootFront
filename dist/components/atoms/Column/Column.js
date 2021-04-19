"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Column = function (_a) {
    var children = _a.children, sm = _a.sm, md = _a.md, lg = _a.lg, gap = _a.gap, align = _a.align, _b = _a.className, className = _b === void 0 ? '' : _b;
    /** Класс для выравнивания колонки в контейнере */
    var alignClass = '';
    switch (align) {
        case 'top':
            alignClass = 'rf-col--top';
            break;
        case 'middle':
            alignClass = 'rf-col--middle';
            break;
        case 'bottom':
            alignClass = 'rf-col--bottom';
            break;
        default:
            alignClass = '';
    }
    /** Классы для размеров колонок */
    var smClass = sm ? "rf-col-sm-" + sm : 'rf-col-sm-auto';
    var mdClass = md ? "rf-col-md-" + md : 'rf-col-md-auto';
    var lgClass = lg ? "rf-col-lg-" + lg : 'rf-col-lg-auto';
    return (react_1.default.createElement("div", { className: "rf-col " + smClass + " " + mdClass + " " + lgClass + " " + alignClass + " " + className, style: {
            paddingLeft: gap + "px",
            paddingRight: gap + "px"
        } }, children));
};
exports.default = Column;
