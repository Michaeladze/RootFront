import { map } from 'rxjs/operators';
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
export var getMonthName = function (value) {
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
/** Добавить нули */
export var addLeadingZeros = function (number, length) {
    if (length === void 0) { length = 2; }
    return ('0'.repeat(length) + number).slice(-length);
};
/**
 * Функция для форматирования даты
 *  @param date - дата, которую нужно преобразовать
 *
 */
export var formatDate = function (date) {
    if (!date) {
        date = Date.now();
    }
    var tempDate = new Date(date);
    var month = addLeadingZeros(tempDate.getMonth() + 1);
    var monthLong = getMonthName(months[tempDate.getMonth()]);
    var monthName = months[tempDate.getMonth()];
    var monthShort = monthsShort[tempDate.getMonth()];
    var dayOfMonth = addLeadingZeros(tempDate.getDate());
    var dayOfWeek = week[tempDate.getDay()];
    var tempHour = tempDate.getHours();
    var hour = addLeadingZeros(tempHour);
    var tempMinutes = tempDate.getMinutes();
    var minutes = addLeadingZeros(tempMinutes);
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
/** Преобразовать dd.mm.yyy в Date */
export var stringToDate = function (s) {
    var d = new Date();
    if (!s) {
        return d;
    }
    var formatToday = formatDate(d.getTime()).date.split('.');
    var _a = s.slice(0, 10).split('.'), dd = _a[0], mm = _a[1], yyyy = _a[2];
    dd = dd.includes('_') ? formatToday[0] : dd;
    mm = mm.includes('_') ? formatToday[1] : mm;
    yyyy = yyyy.includes('_') ? formatToday[2] : yyyy;
    return new Date(+yyyy, +mm - 1, +dd);
};
/**
 * Функция обрезки текста
 * @param text - строка, которую нужно сократить
 * @param n - количество видимых символов
 * @param symbol - символ, который нужно поставить в конце строки
 */
export var getShortString = function (text, n, symbol) {
    if (n === void 0) { n = 50; }
    if (symbol === void 0) { symbol = '...'; }
    return n > text.length ? text : "" + text.slice(0, n) + symbol;
};
/** Заменить подстроку по индексу */
export var replaceAt = function (str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
};
/** Общий класс для цветового оформления */
export var variantClass = {
    base: 'rf--base',
    accent: 'rf--accent',
    complement: 'rf--complement',
    info: 'rf--info',
    success: 'rf--success',
    danger: 'rf--danger',
    warning: 'rf--warning'
};
export var variants = [
    'base',
    'accent',
    'info',
    'complement',
    'danger',
    'warning',
    'success'
];
export var sizeClass = {
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
export var oDataTransform = function () { return map(function (data) {
    delete data['@odata.context'];
    delete data['@odata.metadataEtag'];
    return data.d ? oDataServ(data.d) : data;
}); };
/** Функция для добавления пробелов в число */
export var numberWithSpaces = function (x, n) {
    if (n === void 0) { n = 3; }
    var parts = x.toString().split('.');
    var regex = new RegExp("\\B(?=(\\d{" + n + "})+(?!\\d))", 'g');
    parts[0] = parts[0].replace(regex, ' ');
    return parts.join('.');
};
//# sourceMappingURL=helpers.js.map