export type IDatepickerPeriod = 'prev' | 'current' | 'next';

export type IDatepickerPeriodType = 'day' | 'month' | 'year';

export interface IDatepickerActivePeriod {
  month: number;
  year: number;
  days: IDatepickerDay[];
}

export interface IDatepickerDay {
  period: IDatepickerPeriod;
  date: Date;
}
