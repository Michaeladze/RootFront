var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { formatDate, Input } from '../../../index';
import Calendar from '../../_icons/calendar-outline';
import DatepickerCalendar from '../DatepickerCalendar';
import useClickOutside from '../../../hooks/useClickOutside';
import InputMask from 'react-input-mask';
import { getWeekDay, parseToFormat } from '../DatepickerCalendar/datepicker.utils';
import { stringToDate } from '../../../utils/helpers';
var NewDatepicker = function (_a) {
    var _b = _a.name, name = _b === void 0 ? 'datepicker' : _b, _c = _a.locale, locale = _c === void 0 ? 'ru' : _c, _d = _a.placeholder, placeholder = _d === void 0 ? locale === 'ru' ? 'Выберите дату' : 'Select date' : _d, _e = _a.size, size = _e === void 0 ? 'medium' : _e, defaultValue = _a.defaultValue, min = _a.min, max = _a.max, _f = _a.disabled, disabled = _f === void 0 ? false : _f, _g = _a.readOnly, readOnly = _g === void 0 ? false : _g, onChange = _a.onChange, _h = _a.range, range = _h === void 0 ? false : _h, _j = _a.format, format = _j === void 0 ? 'dd.mm.yyyy' : _j, _k = _a.showDayOfWeek, showDayOfWeek = _k === void 0 ? false : _k;
    var _l = useState([]), dayOfWeek = _l[0], setDayOfWeek = _l[1];
    var _m = useState(undefined), minDate = _m[0], setMinDate = _m[1];
    var _o = useState(undefined), maxDate = _o[0], setMaxDate = _o[1];
    useEffect(function () {
        setMinDate(min ? parseToFormat(min).date : undefined);
    }, [min]);
    useEffect(function () {
        if (max) {
            setMaxDate(max ? parseToFormat(max).date : undefined);
        }
    }, [max]);
    // -------------------------------------------------------------------------------------------------------------------
    var datepickerRef = useRef(null);
    var inputRef = useRef(null);
    /** Отображение календаря */
    var _p = useState(false), showCalendar = _p[0], toggleCalendar = _p[1];
    // -------------------------------------------------------------------------------------------------------------------
    /** Функция отслеживания клика вне элемента */
    var handleClickOutside = useCallback(function () {
        toggleCalendar(false);
    }, []);
    useClickOutside(datepickerRef, handleClickOutside);
    // -------------------------------------------------------------------------------------------------------------------
    var _q = useState(''), inputValue = _q[0], setInputValue = _q[1];
    /** Валидация мин и макс дат. Если не попадает в ограничения, привести к граничным значениям. */
    var validate = function (date) {
        var result = date;
        if (range) {
            var _a = date.split(' - '), from = _a[0], to = _a[1];
            var fromD = 0;
            var toD = 0;
            if (from) {
                from = from.slice(0, 10);
            }
            if (to) {
                to = to.slice(0, 10);
            }
            /** Валидация даты С */
            if (from && !from.includes('_')) {
                fromD = stringToDate(from).getTime();
                if (minDate && fromD < minDate.getTime()) {
                    fromD = minDate.getTime();
                }
                if (maxDate && fromD > maxDate.getTime()) {
                    fromD = minDate ? minDate.getTime() : maxDate.getTime();
                }
                from = formatDate(fromD).date;
            }
            if (to && !to.includes('_')) {
                toD = stringToDate(to).getTime();
                /** Если дата ПО меньше даты С, ставим дату ПО на 1 день больше даты С*/
                if (toD < fromD) {
                    toD = fromD + 24 * 3600 * 1000;
                }
                if (maxDate && toD > maxDate.getTime()) {
                    toD = maxDate.getTime();
                }
                to = formatDate(toD).date;
            }
            if (from || to) {
                result = [from, to].join(' - ');
            }
        }
        else {
            var d = stringToDate(date);
            if (date !== '' && minDate && d.getTime() < minDate.getTime()) {
                result = formatDate(minDate.getTime()).date;
            }
            if (maxDate && d.getTime() > maxDate.getTime()) {
                result = formatDate(maxDate.getTime()).date;
            }
        }
        return result;
    };
    /** Проверяем и подставляем defaultValue */
    useEffect(function () {
        if (!defaultValue) {
            return;
        }
        var inputValue = parseToFormat(defaultValue).string;
        if (!inputValue.includes('_')) {
            inputValue = validate(parseToFormat(defaultValue).string);
        }
        setInputValue(inputValue);
    }, [defaultValue, minDate, maxDate]);
    // -------------------------------------------------------------------------------------------------------------------
    var getReturnValue = function (value, range) {
        if (range) {
            var _a = value.split(' - '), from = _a[0], to = _a[1];
            var fromD = stringToDate(from).getTime();
            var toD = stringToDate(to).getTime();
            return {
                value: value,
                date: {
                    from: new Date(fromD),
                    to: new Date(toD),
                    value: new Date(fromD)
                },
                timestamp: {
                    from: fromD,
                    to: toD,
                    value: fromD
                }
            };
        }
        var date = stringToDate(value);
        return {
            date: {
                from: date,
                to: date,
                value: date
            },
            value: value,
            timestamp: {
                from: date.getTime(),
                to: date.getTime(),
                value: date.getTime()
            }
        };
    };
    var onDatepickerChange = function (e) {
        var result = e.target.value;
        if (range || (result.length === 10 && !result.includes('_'))) {
            result = validate(result);
        }
        setInputValue(result);
    };
    var setValue = function (value) {
        setInputValue(validate(value));
    };
    useEffect(function () {
        if (!inputValue.includes('_') && inputValue !== '') {
            var result = getReturnValue(inputValue, range);
            onChange && onChange(result, name);
            fireOnChange();
        }
        else {
            if (showDayOfWeek) {
                setDayOfWeek([]);
            }
        }
    }, [inputValue, showDayOfWeek]);
    var fireOnChange = function () {
        setTimeout(function () {
            if (inputRef.current) {
                var input = inputRef.current.querySelector('input');
                if (input) {
                    var event_1;
                    if (typeof (Event) === 'function') {
                        event_1 = new Event('change');
                    }
                    else {
                        event_1 = document.createEvent('Event');
                        event_1.initEvent('change', true, true);
                    }
                    input.dispatchEvent(event_1);
                }
            }
        }, 100);
    };
    // -------------------------------------------------------------------------------------------------------------------
    useEffect(function () {
        if (showDayOfWeek) {
            if (!range) {
                if (!inputValue.includes('_') && inputValue !== '') {
                    var result = getReturnValue(inputValue, range);
                    var dayFrom = result.date.value.getDay();
                    setDayOfWeek([getWeekDay(dayFrom, locale)]);
                }
            }
            else {
                var _a = inputValue.split(' - '), fromValue = _a[0], toValue = _a[1];
                if (fromValue && !fromValue.includes('_')) {
                    var from = getReturnValue(fromValue, false);
                    var dayFrom = from.date.from.getDay();
                    setDayOfWeek([getWeekDay(dayFrom, locale)]);
                }
                if (toValue && !toValue.includes('_')) {
                    var to = getReturnValue(toValue, false);
                    var dayTo = to.date.from.getDay();
                    setDayOfWeek(__spreadArray(__spreadArray([], dayOfWeek), [getWeekDay(dayTo, locale)]));
                }
            }
        }
    }, [inputValue, showDayOfWeek, range]);
    // -------------------------------------------------------------------------------------------------------------------
    var onKeyPress = function (e) {
        if (e.keyCode === 13 || e.charCode === 13 || e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    // -------------------------------------------------------------------------------------------------------------------
    var mask, fromMask, toMask;
    if (range) {
        var defaultFromMask = [
            /[0-3]/,
            inputValue[0] === '3' ? /[0,1]/ : inputValue[0] === '0' ? /[1-9]/ : /[0-9]/,
            '.',
            /[0,1]/,
            inputValue[3] === '0' ? /[1-9]/ : /[0-2]/,
            '.',
            /[1,2]/,
            /\d/,
            /\d/,
            /\d/
        ];
        var defaultToMask = [
            /[0-3]/,
            inputValue[13] === '3' ? /[0,1]/ : inputValue[13] === '0' ? /[1-9]/ : /[0-9]/,
            '.',
            /[0,1]/,
            inputValue[16] === '0' ? /[1-9]/ : /[0-2]/,
            '.',
            /[1,2]/,
            /\d/,
            /\d/,
            /\d/
        ];
        fromMask = defaultFromMask;
        toMask = defaultToMask;
        if (showDayOfWeek) {
            if (dayOfWeek[0]) {
                fromMask.push(' ');
                for (var i = 0; i < dayOfWeek[0].length; i++) {
                    fromMask.push(dayOfWeek[0][i]);
                }
            }
            else {
                fromMask = defaultFromMask;
            }
            if (dayOfWeek[1]) {
                toMask.push(' ');
                for (var i = 0; i < dayOfWeek[1].length; i++) {
                    toMask.push(dayOfWeek[1][i]);
                }
            }
            else {
                toMask = defaultToMask;
            }
        }
        mask = __spreadArray(__spreadArray(__spreadArray([], fromMask), [
            ' ',
            '-',
            ' '
        ]), toMask);
    }
    else {
        var defaultMask = [
            /[0-3]/,
            inputValue[0] === '3' ? /[0,1]/ : inputValue[0] === '0' ? /[1-9]/ : /[0-9]/,
            '.',
            /[0,1]/,
            inputValue[3] === '0' ? /[1-9]/ : /[0-2]/,
            '.',
            /[1,2]/,
            /\d/,
            /\d/,
            /\d/
        ];
        mask = defaultMask;
        if (showDayOfWeek) {
            if (dayOfWeek[0]) {
                mask.push(' ');
                for (var i = 0; i < dayOfWeek[0].length; i++) {
                    mask.push(dayOfWeek[0][i]);
                }
            }
            else {
                mask = defaultMask;
            }
        }
    }
    // -------------------------------------------------------------------------------------------------------------------
    var disabledClass = disabled ? 'rf-datepicker__input-wrapper--disabled' : '';
    var readOnlyClass = readOnly ? 'rf-datepicker__input-wrapper--readonly' : '';
    return (React.createElement("div", { className: 'rf-datepicker', ref: datepickerRef },
        React.createElement("div", { className: "rf-datepicker__input-wrapper " + disabledClass + " " + readOnlyClass, ref: inputRef, onFocus: function () { return toggleCalendar(true); } },
            React.createElement(InputMask, { mask: mask, name: name, placeholder: placeholder, value: inputValue, disabled: disabled, readOnly: readOnly, onKeyPress: onKeyPress, onChange: onDatepickerChange },
                React.createElement(Input, { size: size })),
            React.createElement(Calendar, { className: 'rf-datepicker__calendar-button' })),
        showCalendar && (React.createElement(DatepickerCalendar, { value: inputValue, minDate: minDate, maxDate: maxDate, toggleRef: inputRef, setInputValue: setValue, range: range, locale: locale, showCalendar: showCalendar, toggleCalendar: toggleCalendar }))));
};
export default NewDatepicker;
