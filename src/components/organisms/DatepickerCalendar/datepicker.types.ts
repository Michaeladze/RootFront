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

export type IDatepickerStack = [Date | undefined, Date | undefined];

export interface IDateVariants {
  date: {
    from: Date;
    to: Date;
    value: Date;
  };
  timestamp: {
    from: number;
    to: number;
    value: number;
  }
  value: string;
}
