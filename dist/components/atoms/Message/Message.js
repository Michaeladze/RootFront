"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Message.scss");
var helpers_1 = require("../../../utils/helpers");
var Message = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? 'info' : _b, _c = _a.className, className = _c === void 0 ? '' : _c;
    return (react_1.default.createElement("div", { className: "rf-message " + helpers_1.variantClass[variant] + " " + className },
        react_1.default.createElement("div", { className: 'rf-message__message' }, children)));
};
exports.default = Message;
