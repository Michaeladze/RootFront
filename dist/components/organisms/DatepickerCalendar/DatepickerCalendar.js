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
var chevron_left_1 = __importDefault(require("../../_icons/chevron-left"));
var index_1 = require("../../../index");
var datepicker_utils_1 = require("./datepicker.utils");
var helpers_1 = require("../../../utils/helpers");
var DatepickerCalendar = function (_a) {
    var value = _a.value, setInputValue = _a.setInputValue, showCalendar = _a.showCalendar, toggleCalendar = _a.toggleCalendar, minDate = _a.minDate, maxDate = _a.maxDate, toggleRef = _a.toggleRef, range = _a.range, locale = _a.locale;
    /** Ссылка на контент */
    var contentRef = react_1.useRef(null);
    // -------------------------------------------------------------------------------------------------------------------
    /** Текущий выбранный день для range = false */
    var setCurrent = react_1.useCallback(function () {
        if (value && !range) {
            return helpers_1.stringToDate(value);
        }
        return new Date();
    }, [value, range]);
    /** Текущий выбранный диапазон для range = true */
    var setRange = function () {
        var _a, _b;
        if (value && range) {
            var values = value.split(' - ');
            var from = ((_a = values[0]) === null || _a === void 0 ? void 0 : _a.includes('_')) ? undefined : values[0];
            var to = ((_b = values[1]) === null || _b === void 0 ? void 0 : _b.includes('_')) ? undefined : values[1];
            return [from ? helpers_1.stringToDate(from) : undefined, to ? helpers_1.stringToDate(to) : undefined];
        }
        return [undefined, undefined];
    };
    var _b = react_1.useState(setCurrent()), currentDate = _b[0], setCurrentDate = _b[1];
    var _c = react_1.useState([undefined, undefined]), rangeDates = _c[0], setRangeDates = _c[1];
    /** Устанавливаем текущий день */
    react_1.useEffect(function () {
        if (range) {
            setRangeDates(setRange());
        }
        else {
            setCurrentDate(setCurrent());
        }
    }, [value, range]);
    // -------------------------------------------------------------------------------------------------------------------
    var _d = react_1.useState({
        top: '-99999px',
        left: '0',
        right: 'auto'
    }), coordinates = _d[0], setCoordinates = _d[1];
    /** Пересчитываем координаты, если не помещается*/
    var rearrangePosition = function () {
        if (contentRef.current && toggleRef.current) {
            var toggleRect = toggleRef.current.getBoundingClientRect();
            var listRect = contentRef.current.getBoundingClientRect();
            var left = 0;
            var top_1 = toggleRect.height;
            var minGap = 10;
            if (toggleRect.height + toggleRect.top + listRect.height > document.body.offsetHeight) {
                top_1 =
                    toggleRect.height -
                        (toggleRect.height + toggleRect.top + listRect.height - document.body.offsetHeight) -
                        minGap;
            }
            if (toggleRect.left + listRect.width > document.body.offsetWidth) {
                left = document.body.offsetWidth - listRect.width - toggleRect.left - minGap;
            }
            setCoordinates({
                left: left + "px",
                top: top_1 + "px",
                right: 'auto'
            });
        }
    };
    react_1.useEffect(function () {
        setTimeout(function () {
            rearrangePosition();
        });
    }, [showCalendar]);
    // -------------------------------------------------------------------------------------------------------------------
    /** Изменяя дату, изменяем значение в инпуте */
    var onDateChange = function (date) {
        var _a, _b, _c;
        if (range) {
            var dates = __spreadArray([], rangeDates);
            if (dates[0] !== undefined && dates[1] !== undefined) {
                dates = [undefined, undefined];
            }
            if (dates[0] === undefined) {
                dates[0] = date;
                setInputValue(index_1.formatDate(date.getTime()).date + ' - __.__.____');
            }
            else {
                dates[1] = date;
                if (dates[1].getTime() < ((_a = dates[0]) === null || _a === void 0 ? void 0 : _a.getTime())) {
                    dates = [dates[1], dates[0]];
                }
                var newValue = index_1.formatDate((_b = dates[0]) === null || _b === void 0 ? void 0 : _b.getTime()).date + " - " + index_1.formatDate((_c = dates[1]) === null || _c === void 0 ? void 0 : _c.getTime()).date;
                setInputValue(newValue);
                toggleCalendar(false);
            }
        }
        else {
            setInputValue(index_1.formatDate(date.getTime()).date);
            setCurrentDate(date);
            toggleCalendar(false);
        }
        setPeriodType('day');
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Отображаемый период */
    var _e = react_1.useState(datepicker_utils_1.getDaysForMonth(currentDate)), activePeriod = _e[0], setActivePeriod = _e[1];
    react_1.useEffect(function () {
        if (!range) {
            setActivePeriod(datepicker_utils_1.getDaysForMonth(currentDate));
            if (minDate && currentDate.getTime() < minDate.getTime()) {
                setActivePeriod(datepicker_utils_1.getDaysForMonth(minDate));
            }
            if (maxDate && currentDate.getTime() > maxDate.getTime()) {
                setActivePeriod(datepicker_utils_1.getDaysForMonth(maxDate));
            }
        }
        else {
            if (minDate && rangeDates[0] && rangeDates[0].getTime() < minDate.getTime()) {
                setActivePeriod(datepicker_utils_1.getDaysForMonth(minDate));
            }
            if (maxDate && rangeDates[1] && rangeDates[1].getTime() > maxDate.getTime()) {
                setActivePeriod(datepicker_utils_1.getDaysForMonth(maxDate));
            }
        }
    }, [
        currentDate,
        range,
        minDate,
        maxDate
    ]);
    react_1.useEffect(function () {
        if (range) {
            if (rangeDates[1] !== undefined) {
                setActivePeriod(datepicker_utils_1.getDaysForMonth(rangeDates[1]));
            }
            else if (rangeDates[0] !== undefined) {
                setActivePeriod(datepicker_utils_1.getDaysForMonth(rangeDates[0]));
            }
            else {
                setActivePeriod(datepicker_utils_1.getDaysForMonth(new Date()));
            }
        }
    }, [rangeDates, range]);
    // -------------------------------------------------------------------------------------------------------------------
    var onBlur = function (lastButton) {
        if (lastButton) {
            toggleCalendar(false);
        }
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Days */
    var onDayClick = function (date) {
        onDateChange(date);
    };
    var daysJSX = activePeriod.days.map(function (_a, i, array) {
        var _b, _c;
        var period = _a.period, date = _a.date;
        var periodClass = "rf-datepicker__calendar-day--" + period;
        var rangeDayCondition = (rangeDates[0] && datepicker_utils_1.isCurrentDay(date, rangeDates[0])) || (rangeDates[1] && datepicker_utils_1.isCurrentDay(date, rangeDates[1]));
        var activeCondition = range ? rangeDayCondition : datepicker_utils_1.isCurrentDay(date, currentDate);
        var currentDayClass = activeCondition ? 'rf-datepicker__calendar-date--active' : '';
        var fromDateClass = rangeDates[0] && ((_b = rangeDates[0]) === null || _b === void 0 ? void 0 : _b.getTime()) === date.getTime() ? 'rf-datepicker__calendar-date--from' : '';
        var toDateClass = rangeDates[1] && ((_c = rangeDates[1]) === null || _c === void 0 ? void 0 : _c.getTime()) === date.getTime() ? 'rf-datepicker__calendar-date--to' : '';
        var inRangeClass = range && rangeDates[0] && rangeDates[1] &&
            (date.getTime() >= rangeDates[0].getTime() && date.getTime() <= rangeDates[1].getTime()) ?
            'rf-datepicker__calendar-tile--range rf-datepicker__calendar-date--range' : '';
        var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var disabledMin = minDate && minDate.getTime() > d.getTime();
        var disabledMax = maxDate && maxDate.getTime() < d.getTime();
        var disabledClass = disabledMin || disabledMax ? 'rf-datepicker__calendar-date--disabled' : '';
        return (react_1.default.createElement("button", { key: date.getTime(), type: 'button', className: "rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-day\n        " + periodClass + " " + currentDayClass + " " + disabledClass + " " + fromDateClass + " " + toDateClass + " " + inRangeClass, onClick: function () { return onDayClick(date); }, onBlur: function () { return onBlur(i === array.length - 1); } }, date.getDate()));
    });
    // -------------------------------------------------------------------------------------------------------------------
    /** Months */
    var onMonthClick = function (e, monthIndex) {
        e.stopPropagation();
        setActivePeriod(datepicker_utils_1.getDaysForMonth(new Date(activePeriod.year, monthIndex)));
        setPeriodType('day');
    };
    var monthsJSX = datepicker_utils_1.months[locale].map(function (m, i, array) {
        var d = new Date(activePeriod.year, i);
        var rangeMonthCondition = (rangeDates[0] && datepicker_utils_1.isCurrentMonth(d, rangeDates[0])) || (rangeDates[1] && datepicker_utils_1.isCurrentMonth(d, rangeDates[1]));
        var activeCondition = range ? rangeMonthCondition : datepicker_utils_1.isCurrentMonth(d, currentDate);
        var currentMonthClass = activeCondition ? 'rf-datepicker__calendar-date--active' : '';
        var fromMonthCondition = rangeDates[0] && datepicker_utils_1.isCurrentMonth(d, rangeDates[0]);
        var fromMonthClass = fromMonthCondition ? 'rf-datepicker__calendar-month-wrapper--from' : '';
        var toMonthClass = rangeDates[1] && datepicker_utils_1.isCurrentMonth(d, rangeDates[1]) ? 'rf-datepicker__calendar-month-wrapper--to' : '';
        var inRangeCondition = range && rangeDates[0] && rangeDates[1] &&
            (datepicker_utils_1.compareMonths(d, rangeDates[0]) >= 0 && datepicker_utils_1.compareMonths(d, rangeDates[1]) <= 0);
        var inRangeClass = inRangeCondition ?
            'rf-datepicker__calendar-tile--range rf-datepicker__calendar-month-wrapper--range' : '';
        var monthMs = 1000 * 3600 * 24 * 31;
        var disabledMin = minDate && ((minDate.getTime() - monthMs) > d.getTime());
        var disabledMax = maxDate && ((maxDate.getTime()) < d.getTime());
        var disabledClass = disabledMin || disabledMax ? 'rf-datepicker__calendar-date--disabled' : '';
        return (react_1.default.createElement("div", { key: m, className: "rf-datepicker__calendar-month-wrapper " + inRangeClass + " " + fromMonthClass + " " + toMonthClass },
            react_1.default.createElement("button", { type: 'button', className: "rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-month\n        " + currentMonthClass + " " + disabledClass, onClick: function (e) { return onMonthClick(e, i); }, onBlur: function () { return onBlur(i === array.length - 1); } }, m)));
    });
    // -------------------------------------------------------------------------------------------------------------------
    /** Years */
    var stringYear = activePeriod.year.toString();
    var _f = react_1.useState(activePeriod.year - +stringYear[stringYear.length - 1]), decadeStart = _f[0], setDecadeStart = _f[1];
    react_1.useEffect(function () {
        setDecadeStart(activePeriod.year - +stringYear[stringYear.length - 1]);
    }, [activePeriod]);
    var years = [];
    for (var i = 0; i < 10; i++) {
        years.push(decadeStart + i);
    }
    var onYearClick = function (e, year) {
        e.stopPropagation();
        setActivePeriod(datepicker_utils_1.getDaysForMonth(new Date(year, activePeriod.month)));
        setPeriodType('month');
    };
    var yearsJSX = years.map(function (y, i, array) {
        var _a, _b, _c, _d, _e;
        var rangeMonthCondition = (rangeDates[0] && y === rangeDates[0].getFullYear()) ||
            (rangeDates[1] && y === ((_a = rangeDates[1]) === null || _a === void 0 ? void 0 : _a.getFullYear()));
        var activeCondition = range ? rangeMonthCondition : activePeriod.year === y;
        var currentMonthClass = activeCondition ? 'rf-datepicker__calendar-date--active' : '';
        var fromYearClass = rangeDates[0] && ((_b = rangeDates[0]) === null || _b === void 0 ? void 0 : _b.getFullYear()) === y ? 'rf-datepicker__calendar-year--from' : '';
        var toYearClass = rangeDates[1] && ((_c = rangeDates[1]) === null || _c === void 0 ? void 0 : _c.getFullYear()) === y ? 'rf-datepicker__calendar-year--to' : '';
        var inRangeClass = range && rangeDates[0] && rangeDates[1] &&
            (y >= ((_d = rangeDates[0]) === null || _d === void 0 ? void 0 : _d.getFullYear()) && y <= ((_e = rangeDates[1]) === null || _e === void 0 ? void 0 : _e.getFullYear())) ?
            'rf-datepicker__calendar-tile--range rf-datepicker__calendar-year--range' : '';
        var disabledMin = minDate && minDate.getFullYear() > y;
        var disabledMax = maxDate && maxDate.getFullYear() < y;
        var disabledClass = disabledMin || disabledMax ? 'rf-datepicker__calendar-date--disabled' : '';
        return (react_1.default.createElement("div", { key: y, className: "rf-datepicker__calendar-year-wrapper " + inRangeClass + " " + fromYearClass + " " + toYearClass },
            react_1.default.createElement("button", { type: 'button', className: "rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-year\n        " + currentMonthClass + " " + disabledClass, onClick: function (e) { return onYearClick(e, y); }, onBlur: function () { return onBlur(i === array.length - 1); } }, y)));
    });
    // -------------------------------------------------------------------------------------------------------------------
    var onPeriodChange = function (n) {
        if (periodType === 'day') {
            var nextMonth = activePeriod.month + n;
            var nextYear = activePeriod.year;
            if (nextMonth > 11) {
                nextMonth = 0;
                nextYear++;
            }
            if (nextMonth < 0) {
                nextMonth = 11;
                nextYear--;
            }
            setActivePeriod(datepicker_utils_1.getDaysForMonth(new Date(nextYear, nextMonth)));
        }
        if (periodType === 'month') {
            setActivePeriod(datepicker_utils_1.getDaysForMonth(new Date(activePeriod.year + n, activePeriod.month)));
        }
        if (periodType === 'year') {
            setDecadeStart(function (decade) { return decade + n * 10; });
        }
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Тип периода */
    var _g = react_1.useState('day'), periodType = _g[0], setPeriodType = _g[1];
    var periodTypeLabel = {
        day: react_1.default.createElement(react_1.default.Fragment, null,
            " ",
            datepicker_utils_1.months[locale][activePeriod.month],
            " ",
            activePeriod.year,
            " "),
        month: react_1.default.createElement(react_1.default.Fragment, null,
            " ",
            activePeriod.year,
            " "),
        year: react_1.default.createElement(react_1.default.Fragment, null,
            " ",
            decadeStart,
            " - ",
            decadeStart + 9,
            " ")
    };
    var onPeriodTypeChange = function () {
        if (periodType === 'day') {
            setPeriodType('month');
        }
        if (periodType === 'month') {
            setPeriodType('year');
        }
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Активность годов */
    var prevYearDisabled = !!minDate && minDate.getFullYear() > activePeriod.year - 1;
    var nextYearDisabled = !!maxDate && maxDate.getFullYear() < activePeriod.year + 1;
    var arrowsDisabled = {
        prevArrowDisabled: {
            /** Активность перд. месяцев */
            day: prevYearDisabled && !!minDate && minDate.getMonth() > activePeriod.month - 1,
            /** Активность перд. годов */
            month: prevYearDisabled,
            /** Активность перд. декад */
            year: !!minDate && minDate.getFullYear() > decadeStart
        },
        nextArrowDisabled: {
            /** Активность след. месяцев */
            day: nextYearDisabled && !!maxDate && maxDate.getMonth() < activePeriod.month + 1,
            /** Активность след. годов */
            month: nextYearDisabled,
            /** Активность след. декад */
            year: !!maxDate && maxDate.getFullYear() < decadeStart + 10
        }
    };
    /** Флаг активности стрелок */
    var prevArrowDisabled = arrowsDisabled.prevArrowDisabled[periodType];
    var nextArrowDisabled = arrowsDisabled.nextArrowDisabled[periodType];
    /** Активность кнопки Сегодня */
    var d = new Date();
    var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var disabledMin = !!minDate && minDate.getTime() > today.getTime();
    var disabledMax = !!maxDate && maxDate.getTime() < today.getTime();
    var todayDisabled = disabledMin || disabledMax;
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: 'rf-datepicker__calendar', ref: contentRef, style: coordinates },
        react_1.default.createElement("header", { className: 'rf-datepicker__calendar-header' },
            react_1.default.createElement("div", { className: 'rf-calendar__control' },
                react_1.default.createElement("button", { type: 'button', className: 'rf-calendar__button rf-calendar__button--arrow rf-calendar__button-prev', disabled: prevArrowDisabled, onClick: function () { return onPeriodChange(-1); } },
                    react_1.default.createElement(chevron_left_1.default, { className: 'rf-datepicker__calendar-prev' })),
                react_1.default.createElement("button", { type: 'button', className: 'rf-calendar__button rf-calendar__label-button', onClick: onPeriodTypeChange },
                    react_1.default.createElement("span", { className: 'rf-datepicker__calendar-label' }, periodTypeLabel[periodType])),
                react_1.default.createElement("button", { type: 'button', className: 'rf-calendar__button rf-calendar__button--arrow rf-calendar__button-next', disabled: nextArrowDisabled, onClick: function () { return onPeriodChange(1); } },
                    react_1.default.createElement(chevron_left_1.default, { className: 'rf-datepicker__calendar-right' }))),
            react_1.default.createElement("button", { type: 'button', className: 'rf-datepicker__calendar-today', disabled: todayDisabled, onClick: function () { return onDateChange(new Date()); } }, locale === 'ru' ? 'Сегодня' : 'Today')),
        periodType === 'day' && (react_1.default.createElement("div", { className: 'rf-datepicker__calendar-week' }, datepicker_utils_1.weekDays[locale].map(function (d) { return react_1.default.createElement("div", { className: 'rf-datepicker__calendar-tile rf-datepicker__calendar-week-day', key: d }, d); }))),
        react_1.default.createElement("div", { className: 'rf-datepicker__calendar-periods' },
            periodType === 'day' && daysJSX,
            periodType === 'month' && monthsJSX,
            periodType === 'year' && yearsJSX)));
};
exports.default = DatepickerCalendar;
