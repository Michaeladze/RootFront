import React, { Dispatch, RefObject, SetStateAction } from 'react';
import './DatepickerCalendar.scss';
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
    toggleRef: RefObject<HTMLDivElement>;
    /** Диапазон */
    range: boolean;
    /** Язык */
    locale: 'ru' | 'en';
}
declare const DatepickerCalendar: React.FC<IDatepickerCalendarProps>;
export default DatepickerCalendar;
