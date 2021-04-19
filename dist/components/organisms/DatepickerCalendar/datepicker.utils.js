"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekDay = exports.parseToFormat = exports.compareMonths = exports.isCurrentMonth = exports.isCurrentDay = exports.getDaysForMonth = exports.months = exports.weekDays = void 0;
var helpers_1 = require("../../../utils/helpers");
exports.weekDays = {
    ru: [
        'пн',
        'вт',
        'ср',
        'чт',
        'пт',
        'сб',
        'вс'
    ],
    en: [
        'mon',
        'tue',
        'wed',
        'thu',
        'fri',
        'sat',
        'sun'
    ]
};
exports.months = {
    ru: [
        'январь',
        'февраль',
        'март',
        'апрель',
        'май',
        'июнь',
        'июль',
        'август',
        'сентябрь',
        'октябрь',
        'ноябрь',
        'декабрь'
    ],
    en: [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ]
};
var getDaysForMonth = function (d) {
    var date = d || new Date();
    /** Результирующий массив с днями месяца */
    var result = {
        month: date.getMonth(),
        year: date.getFullYear(),
        days: []
    };
    var daysInCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    var weekDayOfFirstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    var weekDayOfLastDay = new Date(date.getFullYear(), date.getMonth(), daysInCurrentMonth).getDay();
    /** Если первый день не понедельник, то добавляем слева дни предыдущего месяца */
    if (weekDayOfFirstDay !== 1) {
        var daysFromPrevMonth = weekDayOfFirstDay - 2;
        if (daysFromPrevMonth < 0) {
            daysFromPrevMonth = 7 - Math.abs(daysFromPrevMonth);
        }
        var lastDayInPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        for (var i = daysFromPrevMonth; i >= 0; i--) {
            result.days[i] = {
                period: 'prev',
                date: new Date(date.getFullYear(), date.getMonth() - 1, lastDayInPrevMonth)
            };
            lastDayInPrevMonth--;
        }
    }
    /** Добавляем все дни текущего месяца */
    for (var i = 1; i <= daysInCurrentMonth; i++) {
        result.days.push({
            period: 'current',
            date: new Date(date.getFullYear(), date.getMonth(), i)
        });
    }
    /** Если последний день не воскресенье, то добавляем справа дни следующего месяца */
    if (weekDayOfLastDay !== 0) {
        var daysFromNextMonth = 7 - weekDayOfLastDay;
        for (var i = 1; i <= daysFromNextMonth; i++) {
            result.days.push({
                period: 'next',
                date: new Date(date.getFullYear(), date.getMonth() + 1, i)
            });
        }
    }
    return result;
};
exports.getDaysForMonth = getDaysForMonth;
var isCurrentDay = function (d1, d2) {
    var d = d2 || new Date();
    return d1.getDate() === d.getDate() &&
        d1.getMonth() === d.getMonth() &&
        d1.getFullYear() === d.getFullYear();
};
exports.isCurrentDay = isCurrentDay;
var isCurrentMonth = function (d1, d2) {
    var d = d2 || new Date();
    return d1.getMonth() === d.getMonth() && d1.getFullYear() === d.getFullYear();
};
exports.isCurrentMonth = isCurrentMonth;
var compareMonths = function (d1, d2) {
    var d = d2 || new Date();
    var m1 = d1.getMonth();
    var y1 = d1.getFullYear();
    var m2 = d.getMonth();
    var y2 = d.getFullYear();
    var date1 = new Date(y1, m1);
    var date2 = new Date(y2, m2);
    if (date1.getTime() > date2.getTime()) {
        return 1;
    }
    else if (date1.getTime() < date2.getTime()) {
        return -1;
    }
    return 0;
};
exports.compareMonths = compareMonths;
/** Преобразование любого типа к дате */
var parseToFormat = function (defaultValue) {
    var inputValue = '';
    /** Заменить на точки символы, находящиеся на 2 и 5 позициях  */
    if (typeof defaultValue === 'string' && defaultValue.length > 0) {
        var newInputValue = defaultValue;
        if (newInputValue[2] !== '.') {
            newInputValue = helpers_1.replaceAt(newInputValue, 2, '.');
        }
        if (newInputValue[5] !== '.') {
            newInputValue = helpers_1.replaceAt(newInputValue, 5, '.');
        }
        inputValue = newInputValue;
    }
    if (typeof defaultValue === 'number') {
        inputValue = helpers_1.formatDate(defaultValue).date;
    }
    if (defaultValue instanceof Date) {
        inputValue = helpers_1.formatDate(defaultValue.getTime()).date;
    }
    var _a = inputValue.split('.'), dd = _a[0], mm = _a[1], yyyy = _a[2];
    var date = new Date(+yyyy, +mm - 1, +dd);
    return {
        date: date,
        string: inputValue
    };
};
exports.parseToFormat = parseToFormat;
/** Получить день недели по индексу */
var getWeekDay = function (n, locale) {
    var weekDays = {
        ru: [
            'Вс',
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб'
        ],
        en: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ]
    };
    return weekDays[locale][n];
};
exports.getWeekDay = getWeekDay;
