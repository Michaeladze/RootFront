export declare type IDatepickerPeriod = 'prev' | 'current' | 'next';
export declare type IDatepickerPeriodType = 'day' | 'month' | 'year';
export interface IDatepickerActivePeriod {
    month: number;
    year: number;
    days: IDatepickerDay[];
}
export interface IDatepickerDay {
    period: IDatepickerPeriod;
    date: Date;
}
export declare type IDatepickerStack = [Date | undefined, Date | undefined];
