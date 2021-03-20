import React, {
  Dispatch, ReactNode, RefObject, SetStateAction, useCallback, useEffect, useRef, useState
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
  const setCurrent = useCallback(() => {
    let d = new Date();
    const formatToday = formatDate(d.getTime()).date.split('.');

    if (value) {
      let [dd, mm, yyyy] = value.split('.');
      dd = dd.includes('_') ? formatToday[0] : dd;
      mm = mm.includes('_') ? formatToday[1] : mm;
      yyyy = yyyy.includes('_') ? formatToday[2] : yyyy;
      d = new Date(`${mm}.${dd}.${yyyy}`);
    }

    return d;
  }, [value]);

  const [currentDate, setCurrentDate] = useState<Date>(setCurrent());

  /** Устанавливаем текущий день */
  useEffect(() => {
    if (range) {
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
    setInputValue(formatDate(date.getTime()).date);
    setPeriodType('day');

    if (!range) {
      setCurrentDate(date);
      toggleCalendar(false);
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Отображаемый период */
  const [activePeriod, setActivePeriod] = useState<IDatepickerActivePeriod>(getDaysForMonth(currentDate));

  useEffect(() => {
    setActivePeriod(getDaysForMonth(currentDate));
  }, [currentDate]);

  useEffect(() => {
    if (minDate && new Date().getTime() < minDate.getTime()) {
      setActivePeriod(getDaysForMonth(minDate));
    }
  }, [minDate]);

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
    const currentDayClass = isCurrentDay(date, currentDate) ? 'rf-datepicker__calendar-date--active' : '';

    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const disabledMin = minDate && minDate.getTime() > d.getTime();
    const disabledMax = maxDate && maxDate.getTime() < d.getTime();
    const disabledClass = disabledMin || disabledMax ? 'rf-datepicker__calendar-date--disabled' : '';

    return (
      <div
        className={`rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-day ${periodClass} ${currentDayClass} ${disabledClass}`}
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
    const d = new Date(activePeriod.year, i);
    const currentMonthClass = isCurrentMonth(d, currentDate) ? 'rf-datepicker__calendar-date--active' : '';

    const monthMs = 1000 * 3600 * 24 * 31;
    const disabledMin = minDate && ((minDate.getTime() - monthMs) > d.getTime());
    const disabledMax = maxDate && ((maxDate.getTime()) < d.getTime());
    const disabledClass = disabledMin || disabledMax ? 'rf-datepicker__calendar-date--disabled' : '';

    return (
      <div className={`rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-month ${currentMonthClass} ${disabledClass}`}
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

    const disabledMin = minDate && minDate.getFullYear() > y;
    const disabledMax = maxDate && maxDate.getFullYear() < y;
    const disabledClass = disabledMin || disabledMax ? 'rf-datepicker__calendar-date--disabled' : '';

    return (
      <div className={`rf-datepicker__calendar-tile rf-datepicker__calendar-date rf-datepicker__calendar-year ${currentMonthClass} ${disabledClass}`}
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
