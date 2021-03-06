export type IDatepickerPeriod = 'prev' | 'current' | 'next';

export type IDatepickerPeriodType = 'day' | 'month' | 'year';

export type DateLocale = 'ru' | 'en';

export interface IDatepickerActivePeriod {
  month: number;
  year: number;
  days: IDatepickerDay[];
}

export interface IDatepickerDay {
  period: IDatepickerPeriod;
  date: Date;
}

export type IDatepickerStack = [Date | undefined, Date | undefined];
