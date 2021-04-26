"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberWithSpaces = exports.oDataTransform = exports.sizeClass = exports.variants = exports.variantClass = exports.replaceAt = exports.getShortString = exports.stringToDate = exports.formatDate = exports.addLeadingZeros = exports.getMonthName = void 0;
var operators_1 = require("rxjs/operators");
var months = [
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
];
var monthsShort = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июнь',
    'июль',
    'авг',
    'сент',
    'окт',
    'нояб',
    'дек'
];
var week = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
];
/**
 * Функция для добавления окончаний к месяцам
 * @param value - имя месяца
 *
 */
var getMonthName = function (value) {
    if (value) {
        var arr = value.split('');
        var result = void 0;
        if (months.indexOf(value) !== -1) {
            arr.splice(arr.length - 1, 1, 'я');
            result = arr.join('');
            return result;
        }
        arr.push('а');
        result = arr.join('');
        return result;
    }
    return '';
};
exports.getMonthName = getMonthName;
/** Добавить нули */
var addLeadingZeros = function (number, length) {
    if (length === void 0) { length = 2; }
    return ('0'.repeat(length) + number).slice(-length);
};
exports.addLeadingZeros = addLeadingZeros;
/**
 * Функция для форматирования даты
 *  @param date - дата, которую нужно преобразовать
 *
 */
var formatDate = function (date) {
    if (!date) {
        date = Date.now();
    }
    var tempDate = new Date(date);
    var month = exports.addLeadingZeros(tempDate.getMonth() + 1);
    var monthLong = exports.getMonthName(months[tempDate.getMonth()]);
    var monthName = months[tempDate.getMonth()];
    var monthShort = monthsShort[tempDate.getMonth()];
    var dayOfMonth = exports.addLeadingZeros(tempDate.getDate());
    var dayOfWeek = week[tempDate.getDay()];
    var tempHour = tempDate.getHours();
    var hour = exports.addLeadingZeros(tempHour);
    var tempMinutes = tempDate.getMinutes();
    var minutes = exports.addLeadingZeros(tempMinutes);
    var year = tempDate.getFullYear();
    return {
        month: month,
        monthLong: monthLong,
        monthShort: monthShort,
        monthName: monthName,
        dayOfMonth: dayOfMonth,
        dayOfWeek: dayOfWeek,
        hour: hour,
        minutes: minutes,
        year: year,
        date: dayOfMonth + "." + month + "." + year,
        time: hour + ":" + minutes
    };
};
exports.formatDate = formatDate;
/** Преобразовать dd.mm.yyy в Date */
var stringToDate = function (s) {
    var d = new Date();
    if (!s) {
        return d;
    }
    var formatToday = exports.formatDate(d.getTime()).date.split('.');
    var _a = s.slice(0, 10).split('.'), dd = _a[0], mm = _a[1], yyyy = _a[2];
    dd = dd.includes('_') ? formatToday[0] : dd;
    mm = mm.includes('_') ? formatToday[1] : mm;
    yyyy = yyyy.includes('_') ? formatToday[2] : yyyy;
    return new Date(+yyyy, +mm - 1, +dd);
};
exports.stringToDate = stringToDate;
/**
 * Функция обрезки текста
 * @param text - строка, которую нужно сократить
 * @param n - количество видимых символов
 * @param symbol - символ, который нужно поставить в конце строки
 */
var getShortString = function (text, n, symbol) {
    if (n === void 0) { n = 50; }
    if (symbol === void 0) { symbol = '...'; }
    return n > text.length ? text : "" + text.slice(0, n) + symbol;
};
exports.getShortString = getShortString;
/** Заменить подстроку по индексу */
var replaceAt = function (str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
};
exports.replaceAt = replaceAt;
/** Общий класс для цветового оформления */
exports.variantClass = {
    base: 'rf--base',
    accent: 'rf--accent',
    complement: 'rf--complement',
    info: 'rf--info',
    success: 'rf--success',
    danger: 'rf--danger',
    warning: 'rf--warning'
};
exports.variants = [
    'base',
    'accent',
    'info',
    'complement',
    'danger',
    'warning',
    'success'
];
exports.sizeClass = {
    'small': 'rf--small',
    'medium': 'rf--medium',
    'big': 'rf--big'
};
function oDataServ(data) {
    (data.results) && (data = data.results);
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            (key === '__metadata') && delete data[key];
            if (Array.isArray(data[key])) {
                data[key].forEach(function (item) {
                    oDataServ(item);
                });
            }
            else if (typeof data[key] === 'object') {
                data[key] = oDataServ(data[key]);
            }
        }
    }
    return data;
}
var oDataTransform = function () { return operators_1.map(function (data) {
    delete data['@odata.context'];
    delete data['@odata.metadataEtag'];
    return data.d ? oDataServ(data.d) : data;
}); };
exports.oDataTransform = oDataTransform;
/** Функция для добавления пробелов в число */
var numberWithSpaces = function (x, n, s) {
    if (n === void 0) { n = 3; }
    if (s === void 0) { s = ' '; }
    var parts = x.toString().split('.');
    var regex = new RegExp("\\B(?=(\\d{" + n + "})+(?!\\d))", 'g');
    parts[0] = parts[0].replace(regex, s);
    return parts.join('.');
};
exports.numberWithSpaces = numberWithSpaces;
