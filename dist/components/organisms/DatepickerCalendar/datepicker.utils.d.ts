import { IDatepickerActivePeriod } from './datepicker.types';
export declare const weekDays: string[];
export declare const months: string[];
export declare const getDaysForMonth: (d?: Date | undefined) => IDatepickerActivePeriod;
export declare const isCurrentDay: (d1: Date, d2?: Date | undefined) => boolean;
export declare const isCurrentMonth: (d1: Date, d2?: Date | undefined) => boolean;
export declare const compareMonths: (d1: Date, d2?: Date | undefined) => number;
/** Преобразование любого типа к дате */
export declare const parseToFormat: (defaultValue?: string | number | Date | undefined) => {
    date: Date;
    string: string;
};
