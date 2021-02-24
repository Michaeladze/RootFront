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
    dayOfMonth,
    dayOfWeek,
    hour,
    minutes,
    year,
    date: `${dayOfMonth}.${month}.${year}`,
    time: `${hour}:${minutes}`
  };
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
