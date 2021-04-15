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
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import Time from '../../_icons/time';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import TimeElement from '../../atoms/TimeElement';
import Menu from '../Menu';
var Timepicker = function (_a) {
    var className = _a.className, initialValue = _a.initialValue, disabled = _a.disabled, onChangeValue = _a.onChangeValue, _b = _a.min, min = _b === void 0 ? '00:00' : _b, _c = _a.max, max = _c === void 0 ? '24:00' : _c, props = __rest(_a, ["className", "initialValue", "disabled", "onChangeValue", "min", "max"]);
    var _d = useState(initialValue), time = _d[0], setTime = _d[1];
    useEffect(function () {
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
    var content = React.createElement(TimeElement, { updateTime: updateTime, value: initialValue, min: min, max: max });
    return (React.createElement("div", { className: "rf-timepicker__wrapper " + (className || '') + " " + (disabled ? 'rf-timepicker__disable' : '') },
        React.createElement(InputMask, { mask: [
                /[0-2]/,
                /[0-9]/,
                ':',
                /[0-5]/,
                /[0,5,8]/
            ], value: time, alwaysShowMask: true, readOnly: props.readOnly, onChange: onChange },
            React.createElement(Input, __assign({}, props, { size: 'medium' }))),
        React.createElement("div", null,
            React.createElement(Menu, { position: 'right', content: content },
                React.createElement(Button, { buttonType: 'text' },
                    React.createElement(Time, { className: 'rf-timepicker__icon' }))))));
};
export default Timepicker;
