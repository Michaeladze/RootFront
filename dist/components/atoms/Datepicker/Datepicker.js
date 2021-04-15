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
import React, { useState } from 'react';
// @ts-ignore
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import Calendar from '../../_icons/calendar-outline';
import Close from '../../_icons/close';
import { sizeClass } from '../../../utils/helpers';
var Datepicker = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 'medium' : _b, _c = _a.showLeadingZeros, showLeadingZeros = _c === void 0 ? true : _c, props = __rest(_a, ["size", "showLeadingZeros"]);
    var _d = useState(props.value || null), value = _d[0], setValue = _d[1];
    /** Изменение значения календаря */
    var handleChange = function (date) {
        var d = date;
        setValue(d);
        props.onChange && props.onChange(d, props.name || '');
    };
    return (React.createElement("div", { className: "rf-datepicker__wrapper " + sizeClass[size] },
        React.createElement(DatePicker, __assign({}, props, { value: value, format: 'dd.MM.y', locale: 'ru-RU', showLeadingZeros: showLeadingZeros, calendarIcon: React.createElement(Calendar, null), clearIcon: props.clear && !props.disabled && value ? React.createElement(Close, null) : null, onChange: handleChange }))));
};
export default Datepicker;
