import { DateLocale, IDatepickerActivePeriod } from './datepicker.types';
import { formatDate, replaceAt } from '../../../utils/helpers';

export const weekDays: Record<DateLocale, string[]> = {
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

export const months: Record<DateLocale, string[]> = {
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

export const compareMonths = (d1: Date, d2?: Date): number => {
  const d = d2 || new Date();

  const m1 = d1.getMonth();
  const y1 = d1.getFullYear();

  const m2 = d.getMonth();
  const y2 = d.getFullYear();

  const date1 = new Date(y1, m1);
  const date2 = new Date(y2, m2);

  if (date1.getTime() > date2.getTime()) {
    return 1;
  } else if (date1.getTime() < date2.getTime()) {
    return -1;
  }

  return 0;
};

/** Преобразование любого типа к дате */
export const parseToFormat = (defaultValue?: Date | string | number): {
  date: Date,
  string: string
} => {
  let inputValue = '';

  /** Заменить на точки символы, находящиеся на 2 и 5 позициях  */
  if (typeof defaultValue === 'string' && defaultValue.length > 0) {
    let newInputValue = defaultValue;

    if (newInputValue[2] !== '.') {
      newInputValue = replaceAt(newInputValue, 2, '.');
    }

    if (newInputValue[5] !== '.') {
      newInputValue = replaceAt(newInputValue, 5, '.');
    }

    inputValue = newInputValue;
  }

  if (typeof defaultValue === 'number') {
    inputValue = formatDate(defaultValue).date;
  }

  if (defaultValue instanceof Date) {
    inputValue = formatDate(defaultValue.getTime()).date;
  }

  const [dd, mm, yyyy] = inputValue.split('.');
  const date = new Date(+yyyy, +mm - 1, +dd);

  return {
    date,
    string: inputValue
  };
};
