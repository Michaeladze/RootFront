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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./InputPhone.scss");
var index_1 = require("../../../index");
var react_input_mask_1 = __importDefault(require("react-input-mask"));
var countryCodes = [
    {
        label: '+7',
        value: '+7'
    },
    {
        label: '+8',
        value: '+8'
    },
    {
        label: '+9',
        value: '+9'
    }
];
var InputPhone = function (_a) {
    var _b = _a.defaultValue, defaultValue = _b === void 0 ? '' : _b, props = __rest(_a, ["defaultValue"]);
    var _c = react_1.useState(defaultValue), inputValue = _c[0], setInputValue = _c[1];
    var _d = react_1.useState(defaultValue), value = _d[0], setValue = _d[1];
    var input = react_1.useRef(null);
    react_1.useEffect(function () {
        setValue(defaultValue.slice(2, defaultValue.length));
    }, [defaultValue]);
    react_1.useEffect(function () {
        setInputValue(countryCodes[0].value + value.replace(/(\s|-|_|\(|\))/g, ''));
    }, [value]);
    // -------------------------------------------------------------------------------------------------------------------
    var _e = react_1.useState(countryCodes[0].value), countryCode = _e[0], setCountryCode = _e[1];
    var onSelectChange = function (e) {
        var body = value.replace(/(\s|-|\(|\))/g, '');
        var phone = e.target.value + body;
        setInputValue(phone);
        setCountryCode(e.target.value);
    };
    var mask = [
        '(',
        /[1-9]/,
        /[1-9]/,
        /[1-9]/,
        ')',
        ' ',
        /[1-9]/,
        /[1-9]/,
        /[1-9]/,
        ' ',
        '-',
        ' ',
        /[1-9]/,
        /[1-9]/,
        ' ',
        '-',
        ' ',
        /[1-9]/,
        /[1-9]/
    ];
    // -------------------------------------------------------------------------------------------------------------------
    var onChange = function (e) {
        var body = e.target.value.replace(/(\s|-|_|\(|\))/g, '');
        var phone = countryCode + body;
        setInputValue(phone);
        setValue(e.target.value);
    };
    // -------------------------------------------------------------------------------------------------------------------
    var onKeyPress = function (e) {
        if (e.keyCode === 13 || e.charCode === 13 || e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    // -------------------------------------------------------------------------------------------------------------------
    react_1.useEffect(function () {
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
    }, [inputValue]);
    // -------------------------------------------------------------------------------------------------------------------
    var _f = react_1.useState(false), isFocus = _f[0], setFocus = _f[1];
    var onFocus = function () {
        setFocus(true);
    };
    var onBlur = function () {
        setFocus(false);
    };
    var focusClass = isFocus ? 'rf-phone-input--focus' : '';
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: "rf-phone-input " + focusClass, onFocus: onFocus, onBlur: onBlur },
        react_1.default.createElement("div", { className: 'rf-phone-input__select' },
            react_1.default.createElement(index_1.Select, { disabled: true, value: countryCodes[0].value, onChange: onSelectChange, options: countryCodes, readOnly: true })),
        react_1.default.createElement("div", { className: 'rf-phone-input__field' },
            react_1.default.createElement(react_input_mask_1.default, { mask: mask, value: value, placeholder: props.placeholder, disabled: props.disabled, readOnly: props.readOnly, onChange: onChange, onKeyPress: onKeyPress },
                react_1.default.createElement(index_1.Input, null)),
            react_1.default.createElement("input", { type: 'hidden', className: 'rf-phone-input__hidden', name: props.name, value: inputValue, ref: input, readOnly: true }))));
};
exports.default = InputPhone;
