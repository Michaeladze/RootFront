import React, {
  Dispatch,
  SetStateAction, useEffect, useState
} from 'react';
import './DatepickerCalendar.scss';
import Chevron from '../../_icons/chevron-left';
import { formatDate } from '../../../index';

interface IDatepickerCalendarProps {
  /** Формат всегда dd.mm.yyyy */
  value: string;
  /** Изменение инпута в родителе */
  setInputValue: Dispatch<SetStateAction<string>>;
}

const DatepickerCalendar: React.FC<IDatepickerCalendarProps> = ({ value, setInputValue }: IDatepickerCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    if (value) {
      const [dd, mm, yyyy] = value.split('.');
      setCurrentDate(new Date(`${mm}.${dd}.${yyyy}`));
    }
  }, [value]);

  const formatCurrentDay = formatDate(currentDate.getTime());

  // -------------------------------------------------------------------------------------------------------------------

  const onDateChange = (date: Date) => {
    setCurrentDate(date);
    setInputValue(formatDate(date.getTime()).date);
  };

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='rf-datepicker__calendar'>
      <header className='rf-datepicker__calendar-header'>
        <div className='rf-calendar__control'>
          <button className='rf-calendar__button rf-calendar__button-prev'>
            <Chevron className='rf-datepicker__calendar-prev'/>
          </button>
          <button className='rf-calendar__button rf-calendar__label-button'>
            <span className='rf-datepicker__calendar-label'>
              {formatCurrentDay.monthName} {formatCurrentDay.year}
            </span>
          </button>
          <button className='rf-calendar__button rf-calendar__button-next'>
            <Chevron className='rf-datepicker__calendar-right'/>
          </button>
        </div>
        <button className='rf-datepicker__calendar-today' onClick={() => onDateChange(new Date())}>Сегодня</button>
      </header>
    </div>
  );
};

export default DatepickerCalendar;
