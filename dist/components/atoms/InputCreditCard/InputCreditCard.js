"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./InputCreditCard.scss");
var index_1 = require("../../../index");
var react_input_mask_1 = __importDefault(require("react-input-mask"));
var InputCreditCard = function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'account' : _b, _c = _a.defaultValue, defaultValue = _c === void 0 ? '' : _c, props = __rest(_a, ["type", "defaultValue"]);
    var input = react_1.useRef(null);
    var _d = react_1.useState(defaultValue), inputValue = _d[0], setInputValue = _d[1];
    var _e = react_1.useState(defaultValue), value = _e[0], setValue = _e[1];
    react_1.useEffect(function () {
        setValue(defaultValue);
    }, [defaultValue]);
    // -------------------------------------------------------------------------------------------------------------------
    var onKeyPress = function (e) {
        if (e.keyCode === 13 || e.charCode === 13 || e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    var onChange = function (e) {
        setValue(e.target.value);
        setInputValue(e.target.value.replace(/\s/g, ''));
        if (!input.current) {
            return;
        }
        var event;
        if (typeof (Event) === 'function') {
            event = new Event('change');
        }
        else {
            event = document.createEvent('Event');
            event.initEvent('change', true, true);
        }
        input.current.dispatchEvent(event);
    };
    // -------------------------------------------------------------------------------------------------------------------
    var mask = [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];
    if (type === 'account') {
        mask = __spreadArray(__spreadArray([], mask), [
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/
        ]);
    }
    var placeholder = type === 'account' ? '0000 0000 0000 0000  0000' : '0000 0000 0000 0000';
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_input_mask_1.default, { maskPlaceholder: ' ', mask: mask, placeholder: props.placeholder || placeholder, value: value, disabled: props.disabled, readOnly: props.readOnly, onKeyPress: onKeyPress, onChange: onChange },
            react_1.default.createElement(index_1.Input, { size: props.size })),
        react_1.default.createElement("input", { type: 'hidden', className: 'rf-card-input__hidden', name: props.name, value: inputValue, ref: input, readOnly: true })));
};
exports.default = InputCreditCard;
