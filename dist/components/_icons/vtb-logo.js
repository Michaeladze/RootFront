"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.default = (function (props) {
    return react_1.default.createElement("svg", __assign({ width: '32', height: '24', viewBox: '0 0 32 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, props),
        react_1.default.createElement("path", { d: 'M29.0036 7.4071H6.80709L8.40612 3.00977H30.6027L29.0036 7.4071ZM28.2041 9.60577H5.99758L4.39855 14.0031H26.5951L28.2041 9.60577ZM25.8056 16.1818H3.59903L2 20.5791H24.1766L25.8056 16.1818Z', fill: 'currentColor' }));
});
