var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Chevron from '../../_icons/chevron-left';
import { formatDate } from '../../../index';
import { compareMonths, getDaysForMonth, isCurrentDay, isCurrentMonth, months, weekDays } from './datepicker.utils';
import { stringToDate } from '../../../utils/helpers';
var DatepickerCalendar = function (_a) {
    var value = _a.value, setInputValue = _a.setInputValue, showCalendar = _a.showCalendar, toggleCalendar = _a.toggleCalendar, minDate = _a.minDate, maxDate = _a.maxDate, toggleRef = _a.toggleRef, range = _a.range, locale = _a.locale;
    /** Ссылка на контент */
    var contentRef = useRef(null);
    // -------------------------------------------------------------------------------------------------------------------
    /** Текущий выбранный день для range = false */
    var setCurrent = useCallback(function () {
        if (value && !range) {
            return stringToDate(value);
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
            return [from ? stringToDate(from) : undefined, to ? stringToDate(to) : undefined];
        }
        return [undefined, undefined];
    };
    var _b = useState(setCurrent()), currentDate = _b[0], setCurrentDate = _b[1];
    var _c = useState([undefined, undefined]), rangeDates = _c[0], setRangeDates = _c[1];
    /** Устанавливаем текущий день */
    useEffect(function () {
        if (range) {
            setRangeDates(setRange());
        }
        else {
            setCurrentDate(setCurrent());
        }
    }, [value, range]);
    // -------------------------------------------------------------------------------------------------------------------
    var _d = useState({
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
    useEffect(function () {
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
                setInputValue(formatDate(date.getTime()).date + ' - __.__.____');
            }
            else {
                dates[1] = date;
                if (dates[1].getTime() < ((_a = dates[0]) === null || _a === void 0 ? void 0 : _a.getTime())) {
                    dates = [dates[1], dates[0]];
                }
                var newValue = formatDate((_b = dates[0]) === null || _b === void 0 ? void 0 : _b.getTime()).date + " - " + formatDate((_c = dates[1]) === null || _c === void 0 ? void 0 : _c.getTime()).date;
                setInputValue(newValue);
                toggleCalendar(false);
            }
        }
        else {
            setInputValue(formatDate(date.getTime()).date);
            setCurrentDate(date);
            toggleCalendar(false);
        }
        setPeriodType('day');
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Отображаемый период */
    var _e = useState(getDaysForMonth(currentDate)), activePeriod = _e[0], setActivePeriod = _e[1];
    useEffect(function () {
        if (!range) {
            setActivePeriod(getDaysForMonth(currentDate));
            if (minDate && currentDate.getTime() < minDate.getTime()) {
                setActivePeriod(getDaysForMonth(minDate));
            }
            if (maxDate && currentDate.getTime() > maxDate.getTime()) {
                setActivePeriod(getDaysForMonth(maxDate));
            }
        }
        else {
            if (minDate && rangeDates[0] && rangeDates[0].getTime() < minDate.getTime()) {
                setActivePeriod(getDaysForMonth(minDate));
            }
            if (maxDate && rangeDates[1] && rangeDates[1].getTime() > maxDate.getTime()) {
                setActivePeriod(getDaysForMonth(maxDate));
            }
        }
    }, [
        currentDate,
        range,
        minDate,
        maxDate
    ]);
    useEffect(function () {
        if (range) {
            if (rangeDates[1] !== undefined) {
                setActivePeriod(getDaysForMonth(rangeDates[1]));
            }
            else if (rangeDates[0] !== undefined) {
                setActivePeriod(getDaysForMonth(rangeDates[0]));
            }
            else {
                setActivePeriod(getDaysForMonth(new Date()));
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
        var rangeDayCondition = (rangeDates[0] && isCurrentDay(date, rangeDates[0])) || (rangeDates[1] && isCurrentDay(date, rangeDates[1]));
        var activeCondition = range ? rangeDayCondition : isCurrentDay(date, currentDate);
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
        return (React.createElement("button", { key: date.getTime(), className: "rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-day\n        " + periodClass + " " + currentDayClass + " " + disabledClass + " " + fromDateClass + " " + toDateClass + " " + inRangeClass, onClick: function () { return onDayClick(date); }, onBlur: function () { return onBlur(i === array.length - 1); } }, date.getDate()));
    });
    // -------------------------------------------------------------------------------------------------------------------
    /** Months */
    var onMonthClick = function (e, monthIndex) {
        e.stopPropagation();
        setActivePeriod(getDaysForMonth(new Date(activePeriod.year, monthIndex)));
        setPeriodType('day');
    };
    var monthsJSX = months[locale].map(function (m, i, array) {
        var d = new Date(activePeriod.year, i);
        var rangeMonthCondition = (rangeDates[0] && isCurrentMonth(d, rangeDates[0])) || (rangeDates[1] && isCurrentMonth(d, rangeDates[1]));
        var activeCondition = range ? rangeMonthCondition : isCurrentMonth(d, currentDate);
        var currentMonthClass = activeCondition ? 'rf-datepicker__calendar-date--active' : '';
        var fromMonthCondition = rangeDates[0] && isCurrentMonth(d, rangeDates[0]);
        var fromMonthClass = fromMonthCondition ? 'rf-datepicker__calendar-month-wrapper--from' : '';
        var toMonthClass = rangeDates[1] && isCurrentMonth(d, rangeDates[1]) ? 'rf-datepicker__calendar-month-wrapper--to' : '';
        var inRangeCondition = range && rangeDates[0] && rangeDates[1] &&
            (compareMonths(d, rangeDates[0]) >= 0 && compareMonths(d, rangeDates[1]) <= 0);
        var inRangeClass = inRangeCondition ?
            'rf-datepicker__calendar-tile--range rf-datepicker__calendar-month-wrapper--range' : '';
        var monthMs = 1000 * 3600 * 24 * 31;
        var disabledMin = minDate && ((minDate.getTime() - monthMs) > d.getTime());
        var disabledMax = maxDate && ((maxDate.getTime()) < d.getTime());
        var disabledClass = disabledMin || disabledMax ? 'rf-datepicker__calendar-date--disabled' : '';
        return (React.createElement("div", { key: m, className: "rf-datepicker__calendar-month-wrapper " + inRangeClass + " " + fromMonthClass + " " + toMonthClass },
            React.createElement("button", { className: "rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-month\n        " + currentMonthClass + " " + disabledClass, onClick: function (e) { return onMonthClick(e, i); }, onBlur: function () { return onBlur(i === array.length - 1); } }, m)));
    });
    // -------------------------------------------------------------------------------------------------------------------
    /** Years */
    var stringYear = activePeriod.year.toString();
    var _f = useState(activePeriod.year - +stringYear[stringYear.length - 1]), decadeStart = _f[0], setDecadeStart = _f[1];
    useEffect(function () {
        setDecadeStart(activePeriod.year - +stringYear[stringYear.length - 1]);
    }, [activePeriod]);
    var years = [];
    for (var i = 0; i < 10; i++) {
        years.push(decadeStart + i);
    }
    var onYearClick = function (e, year) {
        e.stopPropagation();
        setActivePeriod(getDaysForMonth(new Date(year, activePeriod.month)));
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
        return (React.createElement("div", { key: y, className: "rf-datepicker__calendar-year-wrapper " + inRangeClass + " " + fromYearClass + " " + toYearClass },
            React.createElement("button", { className: "rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-year\n        " + currentMonthClass + " " + disabledClass, onClick: function (e) { return onYearClick(e, y); }, onBlur: function () { return onBlur(i === array.length - 1); } }, y)));
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
            setActivePeriod(getDaysForMonth(new Date(nextYear, nextMonth)));
        }
        if (periodType === 'month') {
            setActivePeriod(getDaysForMonth(new Date(activePeriod.year + n, activePeriod.month)));
        }
        if (periodType === 'year') {
            setDecadeStart(function (decade) { return decade + n * 10; });
        }
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Тип периода */
    var _g = useState('day'), periodType = _g[0], setPeriodType = _g[1];
    var periodTypeLabel = {
        day: React.createElement(React.Fragment, null,
            " ",
            months[locale][activePeriod.month],
            " ",
            activePeriod.year,
            " "),
        month: React.createElement(React.Fragment, null,
            " ",
            activePeriod.year,
            " "),
        year: React.createElement(React.Fragment, null,
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
    return (React.createElement("div", { className: 'rf-datepicker__calendar', ref: contentRef, style: coordinates },
        React.createElement("header", { className: 'rf-datepicker__calendar-header' },
            React.createElement("div", { className: 'rf-calendar__control' },
                React.createElement("button", { type: 'button', className: 'rf-calendar__button rf-calendar__button--arrow rf-calendar__button-prev', disabled: prevArrowDisabled, onClick: function () { return onPeriodChange(-1); } },
                    React.createElement(Chevron, { className: 'rf-datepicker__calendar-prev' })),
                React.createElement("button", { type: 'button', className: 'rf-calendar__button rf-calendar__label-button', onClick: onPeriodTypeChange },
                    React.createElement("span", { className: 'rf-datepicker__calendar-label' }, periodTypeLabel[periodType])),
                React.createElement("button", { type: 'button', className: 'rf-calendar__button rf-calendar__button--arrow rf-calendar__button-next', disabled: nextArrowDisabled, onClick: function () { return onPeriodChange(1); } },
                    React.createElement(Chevron, { className: 'rf-datepicker__calendar-right' }))),
            React.createElement("button", { type: 'button', className: 'rf-datepicker__calendar-today', disabled: todayDisabled, onClick: function () { return onDateChange(new Date()); } }, locale === 'ru' ? 'Сегодня' : 'Today')),
        periodType === 'day' && (React.createElement("div", { className: 'rf-datepicker__calendar-week' }, weekDays[locale].map(function (d) { return React.createElement("div", { className: 'rf-datepicker__calendar-tile rf-datepicker__calendar-week-day', key: d }, d); }))),
        React.createElement("div", { className: 'rf-datepicker__calendar-periods' },
            periodType === 'day' && daysJSX,
            periodType === 'month' && monthsJSX,
            periodType === 'year' && yearsJSX)));
};
export default DatepickerCalendar;
