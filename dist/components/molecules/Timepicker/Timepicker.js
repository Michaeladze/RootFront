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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./Timepicker.scss");
var react_input_mask_1 = __importDefault(require("react-input-mask"));
var time_1 = __importDefault(require("../../_icons/time"));
var Input_1 = __importDefault(require("../../atoms/Input"));
var Button_1 = __importDefault(require("../../atoms/Button"));
var TimeElement_1 = __importDefault(require("../../atoms/TimeElement"));
var Menu_1 = __importDefault(require("../Menu"));
var Timepicker = function (_a) {
    var className = _a.className, initialValue = _a.initialValue, disabled = _a.disabled, onChangeValue = _a.onChangeValue, _b = _a.min, min = _b === void 0 ? '00:00' : _b, _c = _a.max, max = _c === void 0 ? '24:00' : _c, props = __rest(_a, ["className", "initialValue", "disabled", "onChangeValue", "min", "max"]);
    var _d = react_1.useState(initialValue), time = _d[0], setTime = _d[1];
    react_1.useEffect(function () {
        setTime(initialValue);
    }, [initialValue]);
    var onChange = function (e) {
        var val = e.target.value;
        setTime(val);
        if (val && !~val.indexOf('_')) {
            onChangeValue && onChangeValue(val, props.id || '');
        }
    };
    var updateTime = function (newTime) {
        setTime(newTime);
        onChangeValue && onChangeValue(newTime, props.id || '');
    };
    var content = react_1.default.createElement(TimeElement_1.default, { updateTime: updateTime, value: initialValue, min: min, max: max });
    return (react_1.default.createElement("div", { className: "rf-timepicker__wrapper " + (className || '') + " " + (disabled ? 'rf-timepicker__disable' : '') },
        react_1.default.createElement(react_input_mask_1.default, { mask: [
                /[0-2]/,
                /[0-9]/,
                ':',
                /[0-5]/,
                /[0,5,8]/
            ], value: time, alwaysShowMask: true, readOnly: props.readOnly, onChange: onChange },
            react_1.default.createElement(Input_1.default, __assign({}, props, { size: 'medium' }))),
        react_1.default.createElement("div", null,
            react_1.default.createElement(Menu_1.default, { position: 'right', content: content },
                react_1.default.createElement(Button_1.default, { buttonType: 'text' },
                    react_1.default.createElement(time_1.default, { className: 'rf-timepicker__icon' }))))));
};
exports.default = Timepicker;
