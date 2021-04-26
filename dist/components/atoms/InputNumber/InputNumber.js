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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./InputNumber.scss");
var index_1 = require("../../../index");
var InputNumber = function (_a) {
    var max = _a.max, _b = _a.defaultValue, defaultValue = _b === void 0 ? '' : _b, _c = _a.separator, separator = _c === void 0 ? ' ' : _c, _d = _a.floatPoints, floatPoints = _d === void 0 ? 0 : _d, _e = _a.groupBy, groupBy = _e === void 0 ? 3 : _e, props = __rest(_a, ["max", "defaultValue", "separator", "floatPoints", "groupBy"]);
    var input = react_1.useRef(null);
    var _f = react_1.useState(''), inputValue = _f[0], setInputValue = _f[1];
    var _g = react_1.useState(defaultValue), value = _g[0], setValue = _g[1];
    // -------------------------------------------------------------------------------------------------------------------
    var onChange = function (e) {
        var value = e.target.value;
        /** Исключить все буквы алфавита */
        if (isNaN(+value.replace(/\s/g, ''))) {
            e.preventDefault();
            return;
        }
        if (floatPoints === 0 && value.includes('.')) {
            var idx = value.indexOf('.');
            value = value.slice(0, idx);
        }
        /** Исключить повторение точек */
        var dotMap = { '.': 0 };
        for (var i = 0; i < value.length; i++) {
            if (!dotMap[value[i]]) {
                dotMap[value[i]] = 1;
            }
            else {
                dotMap[value[i]]++;
            }
        }
        if (dotMap['.'] > 1) {
            return;
        }
        var values = value.split('.');
        var value1 = values[0].replace(/\s/g, '');
        var value2 = values[1];
        var result = '';
        if (value1) {
            var integer = +value1;
            /** Исключить экспоненциальные значения и infinity */
            if (integer > Number.MAX_SAFE_INTEGER) {
                return;
            }
            if (value2 && value2.toString().length > floatPoints) {
                value2 = value2.slice(0, floatPoints);
            }
            var float = +value2;
            result = isNaN(float) ? index_1.numberWithSpaces(integer, groupBy, separator) : [index_1.numberWithSpaces(integer, groupBy, separator), value2].join('.');
        }
        setValue(result);
    };
    // -------------------------------------------------------------------------------------------------------------------
    var handleDefault = function (v) {
        var val = v.toString();
        if (val.includes('.')) {
            var values = val.split('.');
            var result = [index_1.numberWithSpaces(+values[0]), values[1]].join('.');
            setValue(result);
        }
        else {
            val ? setValue(index_1.numberWithSpaces(+val)) : setValue(val);
        }
    };
    react_1.useEffect(function () {
        if (defaultValue) {
            handleDefault(defaultValue);
        }
    }, [defaultValue]);
    react_1.useEffect(function () {
        if (max && +value.toString().replace(/\s/g, '') > max) {
            handleDefault(max);
        }
    }, [value]);
    react_1.useEffect(function () {
        setInputValue(value.toString().replace(/\s/g, ''));
    }, [value]);
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
    var onKeyPress = function (e) {
        if (e.keyCode === 13 || e.charCode === 13 || e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(index_1.Input, { value: value, placeholder: props.placeholder, disabled: props.disabled, readOnly: props.readOnly, onChange: onChange, onKeyPress: onKeyPress }),
        react_1.default.createElement("input", { type: 'text', className: 'rf-number-input__hidden', name: props.name, value: inputValue, ref: input, readOnly: true })));
};
exports.default = InputNumber;
