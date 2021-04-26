"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Preloader.scss");
var helpers_1 = require("../../../utils/helpers");
var Preloader = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.size, size = _c === void 0 ? 'medium' : _c, _d = _a.variant, variant = _d === void 0 ? 'accent' : _d;
    return (react_1.default.createElement("div", { className: "preloader " + helpers_1.sizeClass[size] + " " + helpers_1.variantClass[variant] + " " + className },
        react_1.default.createElement("div", { className: 'preloader__circle' })));
};
exports.default = Preloader;
