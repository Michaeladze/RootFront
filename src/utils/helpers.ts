import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  IFormattedDate, Size, Variant
} from '../types';

const months = [
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
const monthsShort = [
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
const week = [
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
export const getMonthName = (value: string) => {
  if (value) {
    const arr: string[] = value.split('');
    let result;

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
export const addLeadingZeros = (number: number, length = 2) => {
  return ('0'.repeat(length) + number).slice(-length);
};

/**
 * Функция для форматирования даты
 *  @param date - дата, которую нужно преобразовать
 *
 */
export const formatDate = (date: string | number | undefined): IFormattedDate => {
  if (!date) {
    date = Date.now();
  }

  const tempDate = new Date(date);
  const month = addLeadingZeros(tempDate.getMonth() + 1);
  const monthLong = getMonthName(months[tempDate.getMonth()]);
  const monthName = months[tempDate.getMonth()];
  const monthShort = monthsShort[tempDate.getMonth()];

  const dayOfMonth = addLeadingZeros(tempDate.getDate());
  const dayOfWeek = week[tempDate.getDay()];
  const tempHour = tempDate.getHours();
  const hour = addLeadingZeros(tempHour);
  const tempMinutes = tempDate.getMinutes();
  const minutes = addLeadingZeros(tempMinutes);
  const year = tempDate.getFullYear();

  return {
    month,
    monthLong,
    monthShort,
    monthName,
    dayOfMonth,
    dayOfWeek,
    hour,
    minutes,
    year,
    date: `${dayOfMonth}.${month}.${year}`,
    time: `${hour}:${minutes}`
  };
};

/** Преобразовать dd.mm.yyy в Date */
export const stringToDate = (s: string): Date => {
  const d = new Date();

  if (!s) {
    return d;
  }

  const formatToday = formatDate(d.getTime()).date.split('.');

  let [dd, mm, yyyy] = s.slice(0, 10).split('.');
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
export const getShortString = (text: string, n = 50, symbol = '...') => {
  return n > text.length ? text : `${text.slice(0, n)}${symbol}`;
};

/** Заменить подстроку по индексу */
export const replaceAt = (str: string, index: number, replacement: string): string => {
  return str.substr(0, index) + replacement + str.substr(index + replacement.length);
};

/** Общий класс для цветового оформления */
export const variantClass: Record<string, string> = {
  base: 'rf--base',
  accent: 'rf--accent',
  complement: 'rf--complement',
  info: 'rf--info',
  success: 'rf--success',
  danger: 'rf--danger',
  warning: 'rf--warning'
};

export const variants: Variant[] = [
  'base',
  'accent',
  'info',
  'complement',
  'danger',
  'warning',
  'success'
];

export const sizeClass: Record<Size, string> = {
  'small': 'rf--small',
  'medium': 'rf--medium',
  'big': 'rf--big'
};

function oDataServ(data:any) {
  (data.results ) && (data = data.results);

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      (key === '__metadata') && delete data[key];

      if (Array.isArray(data[key])) {
        data[key].forEach((item: any) => {
          oDataServ(item);
        });
      } else if (typeof data[key] === 'object') {
        data[key] = oDataServ(data[key]);
      }
    }
  }

  return data;
}

export const oDataTransform = <T>():MonoTypeOperatorFunction<T> => map((data: any) => {
  delete data['@odata.context'];
  delete data['@odata.metadataEtag'];
  return data.d ? oDataServ(data.d) as T : data as T;
});

/** Функция для добавления пробелов в число */
export const numberWithSpaces = (x: number, n = 3): string => {
  const parts = x.toString().split('.');
  const regex = new RegExp(`\\B(?=(\\d{${n}})+(?!\\d))`, 'g');
  parts[0] = parts[0].replace(regex, ' ');
  return parts.join('.');
};
