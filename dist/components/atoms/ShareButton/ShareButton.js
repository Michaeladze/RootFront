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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var share_1 = __importDefault(require("../../_icons/share"));
var Button_1 = __importDefault(require("../Button"));
var index_1 = require("../../../index");
require("./ShareButton.scss");
var ShareButton = function (_a) {
    var props = __rest(_a, []);
    var onClick = function () {
        var tmp = document.createElement('textarea');
        tmp.style.position = 'absolute';
        tmp.style.opacity = '0';
        tmp.textContent += window.location.href;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
        index_1.sendNotification({
            message: 'Ссылка скопирована в буфер обмена',
            variant: 'info'
        });
    };
    return (
    // @ts-ignore
    react_1.default.createElement(Button_1.default, __assign({}, props, { buttonType: 'round', className: "" + (props.className || ''), onClick: onClick }),
        react_1.default.createElement(share_1.default, null)));
};
exports.default = ShareButton;
