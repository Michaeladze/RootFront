import { DateLocale, IDatepickerActivePeriod } from './datepicker.types';
export declare const weekDays: Record<DateLocale, string[]>;
export declare const months: Record<DateLocale, string[]>;
export declare const getDaysForMonth: (d?: Date | undefined) => IDatepickerActivePeriod;
export declare const isCurrentDay: (d1: Date, d2?: Date | undefined) => boolean;
export declare const isCurrentMonth: (d1: Date, d2?: Date | undefined) => boolean;
export declare const compareMonths: (d1: Date, d2?: Date | undefined) => number;
/** Преобразование любого типа к дате */
export declare const parseToFormat: (defaultValue?: string | number | Date | undefined) => {
    date: Date;
    string: string;
};
/** Получить день недели по индексу */
export declare const getWeekDay: (n: number, locale: DateLocale) => string;
