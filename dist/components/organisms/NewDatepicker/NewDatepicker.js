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
require("./NewDatepicker.scss");
var index_1 = require("../../../index");
var calendar_outline_1 = __importDefault(require("../../_icons/calendar-outline"));
var DatepickerCalendar_1 = __importDefault(require("../DatepickerCalendar"));
var useClickOutside_1 = __importDefault(require("../../../hooks/useClickOutside"));
var react_input_mask_1 = __importDefault(require("react-input-mask"));
var datepicker_utils_1 = require("../DatepickerCalendar/datepicker.utils");
var helpers_1 = require("../../../utils/helpers");
var NewDatepicker = function (_a) {
    var _b = _a.name, name = _b === void 0 ? 'datepicker' : _b, _c = _a.locale, locale = _c === void 0 ? 'ru' : _c, _d = _a.placeholder, placeholder = _d === void 0 ? locale === 'ru' ? 'Выберите дату' : 'Select date' : _d, _e = _a.size, size = _e === void 0 ? 'medium' : _e, defaultValue = _a.defaultValue, min = _a.min, max = _a.max, _f = _a.disabled, disabled = _f === void 0 ? false : _f, _g = _a.readOnly, readOnly = _g === void 0 ? false : _g, onChange = _a.onChange, _h = _a.range, range = _h === void 0 ? false : _h, _j = _a.format, format = _j === void 0 ? 'dd.mm.yyyy' : _j, _k = _a.showDayOfWeek, showDayOfWeek = _k === void 0 ? false : _k;
    var _l = react_1.useState([]), dayOfWeek = _l[0], setDayOfWeek = _l[1];
    var _m = react_1.useState(undefined), minDate = _m[0], setMinDate = _m[1];
    var _o = react_1.useState(undefined), maxDate = _o[0], setMaxDate = _o[1];
    react_1.useEffect(function () {
        setMinDate(min ? datepicker_utils_1.parseToFormat(min).date : undefined);
    }, [min]);
    react_1.useEffect(function () {
        setMaxDate(max ? datepicker_utils_1.parseToFormat(max).date : undefined);
    }, [max]);
    // -------------------------------------------------------------------------------------------------------------------
    var datepickerRef = react_1.useRef(null);
    var inputRef = react_1.useRef(null);
    /** Отображение календаря */
    var _p = react_1.useState(false), showCalendar = _p[0], toggleCalendar = _p[1];
    // -------------------------------------------------------------------------------------------------------------------
    /** Функция отслеживания клика вне элемента */
    var handleClickOutside = react_1.useCallback(function () {
        toggleCalendar(false);
    }, []);
    useClickOutside_1.default(datepickerRef, handleClickOutside);
    // -------------------------------------------------------------------------------------------------------------------
    var _q = react_1.useState(''), inputValue = _q[0], setInputValue = _q[1];
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
                fromD = helpers_1.stringToDate(from).getTime();
                if (minDate && fromD < minDate.getTime()) {
                    fromD = minDate.getTime();
                }
                if (maxDate && fromD > maxDate.getTime()) {
                    fromD = minDate ? minDate.getTime() : maxDate.getTime();
                }
                from = index_1.formatDate(fromD).date;
            }
            if (to && !to.includes('_')) {
                toD = helpers_1.stringToDate(to).getTime();
                /** Если дата ПО меньше даты С, ставим дату ПО на 1 день больше даты С*/
                if (toD < fromD) {
                    toD = fromD + 24 * 3600 * 1000;
                }
                if (maxDate && toD > maxDate.getTime()) {
                    toD = maxDate.getTime();
                }
                to = index_1.formatDate(toD).date;
            }
            if (from || to) {
                result = [from, to].join(' - ');
            }
        }
        else {
            var d = helpers_1.stringToDate(date);
            if (date !== '' && minDate && d.getTime() < minDate.getTime()) {
                result = index_1.formatDate(minDate.getTime()).date;
            }
            if (maxDate && d.getTime() > maxDate.getTime()) {
                result = index_1.formatDate(maxDate.getTime()).date;
            }
        }
        return result;
    };
    /** Проверяем и подставляем defaultValue */
    react_1.useEffect(function () {
        if (!defaultValue) {
            return;
        }
        var inputValue = datepicker_utils_1.parseToFormat(defaultValue).string;
        if (!inputValue.includes('_')) {
            inputValue = validate(datepicker_utils_1.parseToFormat(defaultValue).string);
        }
        setInputValue(inputValue);
    }, [defaultValue, minDate, maxDate]);
    // -------------------------------------------------------------------------------------------------------------------
    var getReturnValue = function (value, range) {
        if (range) {
            var _a = value.split(' - '), from = _a[0], to = _a[1];
            var fromD = helpers_1.stringToDate(from).getTime();
            var toD = helpers_1.stringToDate(to).getTime();
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
        var date = helpers_1.stringToDate(value);
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
    react_1.useEffect(function () {
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
    react_1.useEffect(function () {
        if (showDayOfWeek) {
            if (!range) {
                if (!inputValue.includes('_') && inputValue !== '') {
                    var result = getReturnValue(inputValue, range);
                    var dayFrom = result.date.value.getDay();
                    setDayOfWeek([datepicker_utils_1.getWeekDay(dayFrom, locale)]);
                }
            }
            else {
                var _a = inputValue.split(' - '), fromValue = _a[0], toValue = _a[1];
                if (fromValue && !fromValue.includes('_')) {
                    var from = getReturnValue(fromValue, false);
                    var dayFrom = from.date.from.getDay();
                    setDayOfWeek([datepicker_utils_1.getWeekDay(dayFrom, locale)]);
                }
                if (toValue && !toValue.includes('_')) {
                    var to = getReturnValue(toValue, false);
                    var dayTo = to.date.from.getDay();
                    setDayOfWeek(__spreadArray(__spreadArray([], dayOfWeek), [datepicker_utils_1.getWeekDay(dayTo, locale)]));
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
    return (react_1.default.createElement("div", { className: 'rf-datepicker', ref: datepickerRef },
        react_1.default.createElement("div", { className: "rf-datepicker__input-wrapper " + disabledClass + " " + readOnlyClass, ref: inputRef, onFocus: function () { return toggleCalendar(true); } },
            react_1.default.createElement(react_input_mask_1.default, { mask: mask, name: name, placeholder: placeholder, value: inputValue, disabled: disabled, readOnly: readOnly, onKeyPress: onKeyPress, onChange: onDatepickerChange },
                react_1.default.createElement(index_1.Input, { size: size })),
            react_1.default.createElement(calendar_outline_1.default, { className: 'rf-datepicker__calendar-button' })),
        showCalendar && (react_1.default.createElement(DatepickerCalendar_1.default, { value: inputValue, minDate: minDate, maxDate: maxDate, toggleRef: inputRef, setInputValue: setValue, range: range, locale: locale, showCalendar: showCalendar, toggleCalendar: toggleCalendar }))));
};
exports.default = NewDatepicker;
