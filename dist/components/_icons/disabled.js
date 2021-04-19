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
    return (react_1.default.createElement("svg", __assign({ width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, props),
        react_1.default.createElement("path", { d: 'M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM4 12C4 10.154 4.634 8.458 5.688 7.103L16.897 18.312C15.543 19.366 13.846 20 12 20C7.589 20 4 16.411 4 12ZM18.312 16.897L7.103 5.688C8.458 4.634 10.154 4 12 4C16.411 4 20 7.589 20 12C20 13.846 19.365 15.542 18.312 16.897Z', fill: 'currentColor' })));
});
