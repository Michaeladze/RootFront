import React, {
  Dispatch, ReactNode, SetStateAction, useEffect, useState
} from 'react';
import './DatepickerCalendar.scss';
import Chevron from '../../_icons/chevron-left';
import { formatDate } from '../../../index';
import {
  getDaysForMonth, isCurrentDay, isCurrentMonth, months, weekDays
} from './datepicker.utils';
import {
  IDatepickerActivePeriod, IDatepickerDay, IDatepickerPeriodType
} from './datepicker.types';

interface IDatepickerCalendarProps {
  /** Формат всегда dd.mm.yyyy */
  value: string;
  /** Изменение инпута в родителе */
  setInputValue: Dispatch<SetStateAction<string>>;
  /** Изменить отображение календаря */
  toggleCalendar: Dispatch<SetStateAction<boolean>>;
}

const DatepickerCalendar: React.FC<IDatepickerCalendarProps> = ({
  value,
  setInputValue,
  toggleCalendar
}: IDatepickerCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  /** Устанавливаем текущий день */
  useEffect(() => {
    if (value) {
      const [dd, mm, yyyy] = value.split('.');
      const d = new Date(`${mm}.${dd}.${yyyy}`);
      setCurrentDate(d);

      if (value.length === 10) {
        setActivePeriod(getDaysForMonth(d));
      }
    }
  }, [value]);

  // -------------------------------------------------------------------------------------------------------------------

  /** Изменяя дату, изменяем значение в инпуте */
  const onDateChange = (date: Date) => {
    setCurrentDate(date);
    setInputValue(formatDate(date.getTime()).date);
    setPeriodType('day');
    toggleCalendar(false);
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Отображаемый период */
  const [activePeriod, setActivePeriod] = useState<IDatepickerActivePeriod>(getDaysForMonth(new Date()));

  // -------------------------------------------------------------------------------------------------------------------

  /** Days */
  const onDayClick = (date: Date) => {
    onDateChange(date);
    toggleCalendar(false);
  };

  const daysJSX = activePeriod.days.map(({
    period,
    date
  }: IDatepickerDay) => {
    const periodClass = `rf-datepicker__calendar-day--${period}`;
    const currentDayClass = isCurrentDay(date, currentDate) ? 'rf-datepicker__calendar-date--active' : '';

    return (
      <div className={`rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-day ${periodClass} ${currentDayClass}`}
        key={date.getTime()}
        onClick={() => onDayClick(date)}
      >
        {date.getDate()}
      </div>
    );
  });

  // -------------------------------------------------------------------------------------------------------------------

  /** Months */
  const onMonthClick = (e: React.MouseEvent, monthIndex: number) => {
    e.stopPropagation();
    setActivePeriod(getDaysForMonth(new Date(activePeriod.year, monthIndex)));
    setPeriodType('day');
  };

  const monthsJSX = months.map((m: string, i: number) => {
    const currentMonthClass = isCurrentMonth(new Date(activePeriod.year, i), currentDate) ? 'rf-datepicker__calendar-date--active' : '';

    return (
      <div className={`rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-month ${currentMonthClass}`}
        key={m}
        onClick={(e: React.MouseEvent) => onMonthClick(e, i)}>
        {m}
      </div>
    );
  });

  // -------------------------------------------------------------------------------------------------------------------

  /** Years */
  const stringYear = activePeriod.year.toString();
  const [decadeStart, setDecadeStart] = useState<number>(activePeriod.year - +stringYear[stringYear.length - 1]);
  useEffect(() => {
    setDecadeStart(activePeriod.year - +stringYear[stringYear.length - 1]);
  }, [activePeriod]);
  const years = [];

  for (let i = 0; i < 10; i++) {
    years.push(decadeStart + i);
  }

  const onYearClick = (e: React.MouseEvent, year: number) => {
    e.stopPropagation();
    setActivePeriod(getDaysForMonth(new Date(year, activePeriod.month)));
    setPeriodType('month');
  };

  const yearsJSX = years.map((y: number) => {
    const currentMonthClass = activePeriod.year === y ? 'rf-datepicker__calendar-date--active' : '';

    return (
      <div className={`rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-year ${currentMonthClass}`}
        key={y}
        onClick={(e: React.MouseEvent) => onYearClick(e, y)}>
        {y}
      </div>
    );
  });


  // -------------------------------------------------------------------------------------------------------------------

  const onPeriodChange = (n: number) => {
    if (periodType === 'day') {
      let nextMonth = activePeriod.month + n;
      let nextYear = activePeriod.year;

      if (nextMonth > 11) {
        nextMonth = 0;
        nextYear++;
      }

      if (nextMonth < 0) {
        nextMonth = 11;
        nextYear--;
      }

      setActivePeriod(getDaysForMonth(new Date(nextYear, nextMonth)));
    }

    if (periodType === 'month') {
      setActivePeriod(getDaysForMonth(new Date(activePeriod.year + n, activePeriod.month)));
    }

    if (periodType === 'year') {
      setDecadeStart((decade: number) => decade + n * 10);
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Тип периода */
  const [periodType, setPeriodType] = useState<IDatepickerPeriodType>('day');

  const periodTypeLabel: Record<IDatepickerPeriodType, ReactNode> = {
    day: <> {months[activePeriod.month]} {activePeriod.year} </>,
    month: <> {activePeriod.year} </>,
    year: <> {decadeStart} - {decadeStart + 9} </>
  };

  const onPeriodTypeChange = () => {
    if (periodType === 'day') {
      setPeriodType('month');
    }

    if (periodType === 'month') {
      setPeriodType('year');
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='rf-datepicker__calendar'>
      <header className='rf-datepicker__calendar-header'>
        <div className='rf-calendar__control'>
          <button className='rf-calendar__button rf-calendar__button-prev' onClick={() => onPeriodChange(-1)}>
            <Chevron className='rf-datepicker__calendar-prev'/>
          </button>
          <button className='rf-calendar__button rf-calendar__label-button' onClick={onPeriodTypeChange}>
            <span className='rf-datepicker__calendar-label'>
              {periodTypeLabel[periodType]}
            </span>
          </button>
          <button className='rf-calendar__button rf-calendar__button-next' onClick={() => onPeriodChange(1)}>
            <Chevron className='rf-datepicker__calendar-right'/>
          </button>
        </div>
        <button className='rf-datepicker__calendar-today' onClick={() => onDateChange(new Date())}>Сегодня</button>
      </header>

      {periodType === 'day' && (
        <div className='rf-datepicker__calendar-week'>
          {weekDays.map((d: string) => <div className='rf-datepicker__calendar-tile rf-datepicker__calendar-week-day' key={d}>{d}</div>)}
        </div>
      )}

      <div className='rf-datepicker__calendar-periods'>
        {periodType === 'day' && daysJSX}
        {periodType === 'month' && monthsJSX}
        {periodType === 'year' && yearsJSX}
      </div>

    </div>
  );
};

export default DatepickerCalendar;
