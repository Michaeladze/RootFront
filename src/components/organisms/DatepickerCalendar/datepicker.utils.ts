import { IDatepickerActivePeriod } from './datepicker.types';
import { formatDate } from '../../../utils/helpers';

export const weekDays = [
  'пн',
  'вт',
  'ср',
  'чт',
  'пт',
  'сб',
  'вс'
];

export const months = [
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

export const getDaysForMonth = (d?: Date): IDatepickerActivePeriod => {
  const date = d || new Date();

  /** Результирующий массив с днями месяца */
  const result: IDatepickerActivePeriod = {
    month: date.getMonth(),
    year: date.getFullYear(),
    days: []
  };

  const daysInCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const weekDayOfFirstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const weekDayOfLastDay = new Date(date.getFullYear(), date.getMonth(), daysInCurrentMonth).getDay();

  /** Если первый день не понедельник, то добавляем слева дни предыдущего месяца */
  if (weekDayOfFirstDay !== 1) {
    let daysFromPrevMonth = weekDayOfFirstDay - 2;

    if (daysFromPrevMonth < 0) {
      daysFromPrevMonth = 7 - Math.abs(daysFromPrevMonth);
    }

    let lastDayInPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    for (let i = daysFromPrevMonth; i >= 0; i--) {
      result.days[i] = {
        period: 'prev',
        date: new Date(date.getFullYear(), date.getMonth() - 1, lastDayInPrevMonth)
      };
      lastDayInPrevMonth--;
    }
  }

  /** Добавляем все дни текущего месяца */
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    result.days.push({
      period: 'current',
      date: new Date(date.getFullYear(), date.getMonth(), i)
    });
  }

  /** Если последний день не воскресенье, то добавляем справа дни следующего месяца */
  if (weekDayOfLastDay !== 0) {
    const daysFromNextMonth = 7 - weekDayOfLastDay;

    for (let i = 1; i <= daysFromNextMonth; i++) {
      result.days.push({
        period: 'next',
        date: new Date(date.getFullYear(), date.getMonth() + 1, i)
      });
    }
  }

  return result;
};

export const isCurrentDay = (d1: Date, d2?: Date): boolean => {
  const d = d2 || new Date();

  return d1.getDate() === d.getDate() &&
    d1.getMonth() === d.getMonth() &&
    d1.getFullYear() === d.getFullYear();
};

export const isCurrentMonth = (d1: Date, d2?: Date): boolean => {
  const d = d2 || new Date();
  return d1.getMonth() === d.getMonth() && d1.getFullYear() === d.getFullYear();
};

export const stringToDate = (s: string): Date => {
  const d = new Date();
  const formatToday = formatDate(d.getTime()).date.split('.');

  let [dd, mm, yyyy] = s.split('.');
  dd = dd.includes('_') ? formatToday[0] : dd;
  mm = mm.includes('_') ? formatToday[1] : mm;
  yyyy = yyyy.includes('_') ? formatToday[2] : yyyy;
  return new Date(`${mm}.${dd}.${yyyy}`);
};
