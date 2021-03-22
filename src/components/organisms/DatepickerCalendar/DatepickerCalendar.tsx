import React, {
  Dispatch, ReactNode, RefObject, SetStateAction, useCallback, useEffect, useRef, useState
} from 'react';
import Chevron from '../../_icons/chevron-left';
import { formatDate } from '../../../index';
import {
  compareMonths,
  getDaysForMonth, isCurrentDay, isCurrentMonth, months, stringToDate, weekDays
} from './datepicker.utils';
import {
  IDatepickerActivePeriod, IDatepickerDay, IDatepickerPeriodType, IDatepickerStack
} from './datepicker.types';

interface IDatepickerCalendarProps {
  /** Формат всегда dd.mm.yyyy */
  value: string;
  /** Изменение инпута в родителе */
  setInputValue: (value: string) => void;
  /** Видимость календаря */
  showCalendar: boolean;
  /** Изменить отображение календаря */
  toggleCalendar: Dispatch<SetStateAction<boolean>>;
  /** Минимальная дата */
  minDate?: Date;
  /** Максимальная дата */
  maxDate?: Date;
  /** Ссылка на инпут */
  toggleRef: RefObject<HTMLDivElement>
  /** Диапазон */
  range: boolean;
}

const DatepickerCalendar: React.FC<IDatepickerCalendarProps> = ({
  value,
  setInputValue,
  showCalendar,
  toggleCalendar,
  minDate,
  maxDate,
  toggleRef,
  range
}: IDatepickerCalendarProps) => {

  /** Ссылка на контент */
  const contentRef = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------------------------------------------------------------------

  /** Текущий выбранный день для range = false */
  const setCurrent = useCallback((): Date => {
    if (value && !range) {
      return stringToDate(value);
    }

    return new Date();
  }, [value, range]);

  /** Текущий выбранный диапазон для range = true */
  const setRange = (): IDatepickerStack => {
    if (value && range) {
      const values = value.split(' - ');
      const from = values[0].includes('_') ? undefined : values[0];
      const to = values[1].includes('_') ? undefined : values[1];
      return [from ? stringToDate(from) : undefined, to ? stringToDate(to) : undefined];
    }

    return [undefined, undefined];
  };

  const [currentDate, setCurrentDate] = useState<Date>(setCurrent());
  const [rangeDates, setRangeDates] = useState<IDatepickerStack>([undefined, undefined]);

  /** Устанавливаем текущий день */
  useEffect(() => {
    if (range) {
      setRangeDates(setRange());
    } else {
      setCurrentDate(setCurrent());
    }
  }, [value, range]);

  // -------------------------------------------------------------------------------------------------------------------

  const [coordinates, setCoordinates] = useState({
    top: '-9999px',
    left: '0',
    right: 'auto'
  });

  /** Пересчитываем координаты, если не помещается*/
  const rearrangePosition = () => {
    if (contentRef.current && toggleRef.current) {
      const toggleRect: DOMRect = toggleRef.current.getBoundingClientRect();
      const listRect: DOMRect = contentRef.current.getBoundingClientRect();

      let left = 0;
      let top: number = toggleRect.height;
      const minGap = 10;

      if (toggleRect.height + toggleRect.top + listRect.height > document.body.offsetHeight) {
        top =
          toggleRect.height -
          (toggleRect.height + toggleRect.top + listRect.height - document.body.offsetHeight) -
          minGap;
      }

      if (toggleRect.left + listRect.width > document.body.offsetWidth) {
        left = document.body.offsetWidth - listRect.width - toggleRect.left - minGap;
      }

      setCoordinates({
        left: `${left}px`,
        top: `${top}px`,
        right: 'auto'
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      rearrangePosition();
    });
  }, [showCalendar]);

  // -------------------------------------------------------------------------------------------------------------------

  /** Изменяя дату, изменяем значение в инпуте */
  const onDateChange = (date: Date) => {
    if (range) {
      let dates: IDatepickerStack = [...rangeDates];

      if (dates[0] !== undefined && dates[1] !== undefined) {
        dates = [undefined, undefined];
      }

      if (dates[0] === undefined) {
        dates[0] = date;
        setInputValue(formatDate(date.getTime()).date + ' - __.__.____');
      } else {
        if (date.getTime() >= dates[0]?.getTime()) {
          dates[1] = date;
          const tmp = value.split(' - ');
          tmp[1] = formatDate(date.getTime()).date;
          const newValue = tmp.join(' - ');
          setInputValue(newValue);
          toggleCalendar(false);
        }
      }
    } else {
      setInputValue(formatDate(date.getTime()).date);
      setCurrentDate(date);
      toggleCalendar(false);
    }

    setPeriodType('day');
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Отображаемый период */
  const [activePeriod, setActivePeriod] = useState<IDatepickerActivePeriod>(getDaysForMonth(currentDate));

  useEffect(() => {
    if (!range) {
      setActivePeriod(getDaysForMonth(currentDate));

      if (minDate && currentDate.getTime() < minDate.getTime()) {
        setActivePeriod(getDaysForMonth(minDate));
      }

      if (maxDate && currentDate.getTime() > maxDate.getTime()) {
        setActivePeriod(getDaysForMonth(maxDate));
      }
    } else {
      if (minDate && rangeDates[0] && rangeDates[0].getTime() < minDate.getTime()) {
        setActivePeriod(getDaysForMonth(minDate));
      }

      if (maxDate && rangeDates[1] && rangeDates[1].getTime() > maxDate.getTime()) {
        setActivePeriod(getDaysForMonth(maxDate));
      }
    }
  }, [
    currentDate,
    range,
    minDate,
    maxDate
  ]);

  useEffect(() => {
    if (range) {
      if (rangeDates[1] !== undefined) {
        setActivePeriod(getDaysForMonth(rangeDates[1]));
      } else if (rangeDates[0] !== undefined) {
        setActivePeriod(getDaysForMonth(rangeDates[0]));
      } else {
        setActivePeriod(getDaysForMonth(new Date()));
      }
    }
  }, [rangeDates, range]);

  // -------------------------------------------------------------------------------------------------------------------

  /** Days */
  const onDayClick = (date: Date) => {
    onDateChange(date);
  };

  const daysJSX = activePeriod.days.map(({
    period,
    date
  }: IDatepickerDay) => {
    const periodClass = `rf-datepicker__calendar-day--${period}`;
    const rangeDayCondition = (rangeDates[0] && isCurrentDay(date, rangeDates[0])) || (rangeDates[1] && isCurrentDay(date, rangeDates[1]));
    const activeCondition = range ? rangeDayCondition : isCurrentDay(date, currentDate);
    const currentDayClass = activeCondition ? 'rf-datepicker__calendar-date--active' : '';

    const fromDateClass = rangeDates[0] && rangeDates[0]?.getTime() === date.getTime() ? 'rf-datepicker__calendar-date--from' : '';
    const toDateClass = rangeDates[1] && rangeDates[1]?.getTime() === date.getTime() ? 'rf-datepicker__calendar-date--to' : '';
    const inRangeClass = range && rangeDates[0] && rangeDates[1] &&
    (date.getTime() >= rangeDates[0].getTime() && date.getTime() <= rangeDates[1].getTime()) ?
      'rf-datepicker__calendar-tile--range rf-datepicker__calendar-date--range' : '';

    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const disabledMin = minDate && minDate.getTime() > d.getTime();
    const disabledMax = maxDate && maxDate.getTime() < d.getTime();
    const disabledClass = disabledMin || disabledMax ? 'rf-datepicker__calendar-date--disabled' : '';

    return (
      <div
        key={date.getTime()}
        className={`rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-day
        ${periodClass} ${currentDayClass} ${disabledClass} ${fromDateClass} ${toDateClass} ${inRangeClass}`}
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
    const d = new Date(activePeriod.year, i);
    const rangeMonthCondition = (rangeDates[0] && isCurrentMonth(d, rangeDates[0])) || (rangeDates[1] && isCurrentMonth(d, rangeDates[1]));
    const activeCondition = range ? rangeMonthCondition : isCurrentMonth(d, currentDate);
    const currentMonthClass = activeCondition ? 'rf-datepicker__calendar-date--active' : '';

    const fromMonthCondition = rangeDates[0] && isCurrentMonth(d, rangeDates[0]);
    const fromMonthClass = fromMonthCondition ? 'rf-datepicker__calendar-month-wrapper--from' : '';

    const toMonthClass = rangeDates[1] && isCurrentMonth(d, rangeDates[1]) ? 'rf-datepicker__calendar-month-wrapper--to' : '';
    const inRangeCondition = range && rangeDates[0] && rangeDates[1] &&
      (compareMonths(d, rangeDates[0]) >= 0 && compareMonths(d, rangeDates[1]) <= 0);
    const inRangeClass = inRangeCondition ?
      'rf-datepicker__calendar-tile--range rf-datepicker__calendar-month-wrapper--range' : '';

    const monthMs = 1000 * 3600 * 24 * 31;
    const disabledMin = minDate && ((minDate.getTime() - monthMs) > d.getTime());
    const disabledMax = maxDate && ((maxDate.getTime()) < d.getTime());
    const disabledClass = disabledMin || disabledMax ? 'rf-datepicker__calendar-date--disabled' : '';

    return (
      <div key={m} className={`rf-datepicker__calendar-month-wrapper ${inRangeClass} ${fromMonthClass} ${toMonthClass}`}>
        <div
          className={`rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-month
        ${currentMonthClass} ${disabledClass}`}
          onClick={(e: React.MouseEvent) => onMonthClick(e, i)}>
          {m}
        </div>
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
    const rangeMonthCondition = (rangeDates[0] && y === rangeDates[0].getFullYear()) ||
      (rangeDates[1] && y === rangeDates[1]?.getFullYear());
    const activeCondition = range ? rangeMonthCondition : activePeriod.year === y;
    const currentMonthClass = activeCondition ? 'rf-datepicker__calendar-date--active' : '';

    const fromYearClass = rangeDates[0] && rangeDates[0]?.getFullYear() === y ? 'rf-datepicker__calendar-year--from' : '';
    const toYearClass = rangeDates[1] && rangeDates[1]?.getFullYear() === y ? 'rf-datepicker__calendar-year--to' : '';
    const inRangeClass = range && rangeDates[0] && rangeDates[1] &&
    (y >= rangeDates[0]?.getFullYear() && y <= rangeDates[1]?.getFullYear()) ?
      'rf-datepicker__calendar-tile--range rf-datepicker__calendar-year--range' : '';

    const disabledMin = minDate && minDate.getFullYear() > y;
    const disabledMax = maxDate && maxDate.getFullYear() < y;
    const disabledClass = disabledMin || disabledMax ? 'rf-datepicker__calendar-date--disabled' : '';

    return (
      <div key={y} className={`rf-datepicker__calendar-year-wrapper ${inRangeClass} ${fromYearClass} ${toYearClass}`}>
        <div
          className={`rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-year
        ${currentMonthClass} ${disabledClass}`}
          onClick={(e: React.MouseEvent) => onYearClick(e, y)}>
          {y}
        </div>
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

  /** Активность месяцев */
  const prevMonthDisabled = periodType === 'day' && !!minDate && minDate.getMonth() > activePeriod.month - 1;
  const nextMonthDisabled = periodType === 'day' && !!maxDate && maxDate.getMonth() < activePeriod.month + 1;

  /** Активность годов */
  const prevYearDisabled = periodType === 'month' && !!minDate && minDate.getFullYear() > activePeriod.year - 1;
  const nextYearDisabled = periodType === 'month' && !!maxDate && maxDate.getFullYear() < activePeriod.year + 1;

  /** Активность декад */
  const prevDecadeDisabled = periodType === 'year' && !!minDate && minDate.getFullYear() > decadeStart;
  const nextDecadeDisabled = periodType === 'year' && !!maxDate && maxDate.getFullYear() < decadeStart + 10;

  /** Флаг активности стрелок */
  const prevArrowDisabled: boolean = prevMonthDisabled || prevYearDisabled || prevDecadeDisabled;
  const nextArrowDisabled: boolean = nextMonthDisabled || nextYearDisabled || nextDecadeDisabled;

  /** Активность кнопки Сегодня */
  const d = new Date();
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const disabledMin = !!minDate && minDate.getTime() > today.getTime();
  const disabledMax = !!maxDate && maxDate.getTime() < today.getTime();
  const todayDisabled: boolean = disabledMin || disabledMax;

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='rf-datepicker__calendar' ref={contentRef} style={coordinates}>
      <header className='rf-datepicker__calendar-header'>
        <div className='rf-calendar__control'>
          <button className='rf-calendar__button rf-calendar__button-prev' disabled={prevArrowDisabled} onClick={() => onPeriodChange(-1)}>
            <Chevron className='rf-datepicker__calendar-prev'/>
          </button>
          <button className='rf-calendar__button rf-calendar__label-button' onClick={onPeriodTypeChange}>
            <span className='rf-datepicker__calendar-label'>
              {periodTypeLabel[periodType]}
            </span>
          </button>
          <button className='rf-calendar__button rf-calendar__button-next' disabled={nextArrowDisabled} onClick={() => onPeriodChange(1)}>
            <Chevron className='rf-datepicker__calendar-right'/>
          </button>
        </div>
        <button className='rf-datepicker__calendar-today' disabled={todayDisabled} onClick={() => onDateChange(new Date())}>Сегодня</button>
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
