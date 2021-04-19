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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var UserPhoto = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.url, url = _c === void 0 ? '' : _c, _d = _a.radius, radius = _d === void 0 ? '40px' : _d, _e = _a.fullName, fullName = _e === void 0 ? '' : _e;
    var styles = radius ? {
        width: radius,
        height: radius,
        minWidth: radius,
        minHeight: radius
    } : {};
    var _f = react_1.useState(''), initials = _f[0], setInitials = _f[1];
    var isSapUrl = (url === null || url === void 0 ? void 0 : url.slice(0, 4)) === '/sap';
    if (isSapUrl) {
        var host = ~window.location.hostname.indexOf('127.0.') ? 'https://sapd-fes-ap01.vtb24.ru:44310/' : '';
        url = host + url;
    }
    react_1.useEffect(function () {
        if (fullName) {
            var _a = fullName.split(' '), f = _a[0], s = _a[1];
            var text = '';
            f && (text = f.charAt(0).toUpperCase());
            s && (text += s.charAt(0).toUpperCase());
            setInitials(text);
        }
    }, [fullName]);
    return (react_1.default.createElement("div", { className: "rf__user-photo " + className, style: __assign({ backgroundImage: "url(\"" + url + "\")" }, styles) }, !url && initials));
};
exports.default = UserPhoto;
