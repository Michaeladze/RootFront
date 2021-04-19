"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var helpers_1 = require("../../../utils/helpers");
var Tag = function (_a) {
    var children = _a.children, onClick = _a.onClick, _b = _a.variant, variant = _b === void 0 ? 'base' : _b, _c = _a.size, size = _c === void 0 ? 'medium' : _c;
    var handleClick = function (e) {
        e.preventDefault();
        onClick && onClick();
    };
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: "rf-tag " + helpers_1.variantClass[variant] + " " + helpers_1.sizeClass[size], onClick: handleClick }, children));
};
exports.default = Tag;
