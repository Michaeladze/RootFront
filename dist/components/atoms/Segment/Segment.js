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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var helpers_1 = require("../../../utils/helpers");
var index_1 = require("../../../index");
require("./Segment.scss");
var Segment = function (_a) {
    var list = _a.list, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.variant, variant = _c === void 0 ? 'accent' : _c, props = __rest(_a, ["list", "className", "variant"]);
    var slider = react_1.useRef(null);
    // -------------------------------------------------------------------------------------------------------------------
    /** Изменение позиции слайдера */
    var onChange = function (e, i) {
        if (slider.current) {
            slider.current.style.transform = "translateX(" + 100 * i + "%)";
        }
        props.onChange && props.onChange(e);
    };
    // -------------------------------------------------------------------------------------------------------------------
    var radioButtons = list.map(function (o, i) { return (react_1.default.createElement("div", { key: o.value, className: 'rf-segment__item' },
        react_1.default.createElement(index_1.Radio, __assign({}, o, { variant: variant, onChange: function (e) { return onChange(e, i); }, name: props.name || 'defaultSegmentName', checked: props.defaultChecked, icon: false })))); });
    return (react_1.default.createElement("div", { className: "rf-segment " + className + " " + helpers_1.variantClass[variant] },
        react_1.default.createElement("div", { className: 'rf-segment__list' }, radioButtons),
        react_1.default.createElement("div", { className: 'rf-segment__slider', ref: slider })));
};
exports.default = Segment;
