import React, {
  useCallback,
  useEffect, useRef, useState
} from 'react';
import { formatDate, Input } from '../../../index';
import { DateFormat, Size } from '../../../types';
import Calendar from '../../_icons/calendar-outline';
import DatepickerCalendar from '../DatepickerCalendar';
import useClickOutside from '../../../hooks/useClickOutside';
import InputMask from 'react-input-mask';
import { IDateVariants } from '../../../types/projects.types';
import { getWeekDay, parseToFormat } from '../DatepickerCalendar/datepicker.utils';
import { stringToDate } from '../../../utils/helpers';

export interface IDatepickerProps {
  /** Название */
  name?: string;
  placeholder?: string;
  /** Значение по умолчанию */
  defaultValue?: Date | string | number;
  disabled?: boolean;
  readOnly?: boolean;
  /** Размер */
  size?: Size;
  /** Минимальная дата */
  min?: Date | string | number;
  /** Максимальная дата */
  max?: Date | string | number;
  /** Возвращает дату */
  onChange?: (value: IDateVariants, name?: string) => void;
  /** Диапазон */
  range?: boolean;
  /** Формат */
  format?: DateFormat;
  /** Показать день недели */
  showDayOfWeek?: boolean;
  /** Язык */
  locale?: 'ru' | 'en';
}

const NewDatepicker: React.FC<IDatepickerProps> = ({
  name = 'datepicker',
  locale = 'ru',
  placeholder = locale === 'ru' ? 'Выберите дату' : 'Select date',
  size = 'medium',
  defaultValue,
  min,
  max,
  disabled = false,
  readOnly = false,
  onChange,
  range = false,
  format = 'dd.mm.yyyy',
  showDayOfWeek = false,
}: IDatepickerProps) => {

  const [dayOfWeek, setDayOfWeek] = useState<string[]>([]);

  const [minDate, setMinDate] = useState<Date | undefined>(undefined);
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setMinDate(min ? parseToFormat(min).date : undefined);
  }, [min]);

  useEffect(() => {
    setMaxDate(max ? parseToFormat(max).date : undefined);
  }, [max]);

  // -------------------------------------------------------------------------------------------------------------------

  const datepickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  /** Отображение календаря */
  const [showCalendar, toggleCalendar] = useState<boolean>(false);
  // -------------------------------------------------------------------------------------------------------------------

  /** Функция отслеживания клика вне элемента */
  const handleClickOutside = useCallback(() => {
    toggleCalendar(false);
  }, []);

  useClickOutside(datepickerRef, handleClickOutside);

  // -------------------------------------------------------------------------------------------------------------------

  const [inputValue, setInputValue] = useState<string>('');

  /** Валидация мин и макс дат. Если не попадает в ограничения, привести к граничным значениям. */
  const validate = (date: string): string => {
    let result = date;

    if (range) {
      let [from, to] = date.split(' - ');
      let fromD = 0;
      let toD = 0;

      if (from) {
        from = from.slice(0, 10);
      }

      if (to) {
        to = to.slice(0, 10);
      }

      /** Валидация даты С */
      if (from && !from.includes('_')) {
        fromD = stringToDate(from).getTime();

        if (minDate && fromD < minDate.getTime()) {
          fromD = minDate.getTime();
        }

        if (maxDate && fromD > maxDate.getTime()) {
          fromD = minDate ? minDate.getTime() : maxDate.getTime();
        }

        from = formatDate(fromD).date;
      }

      if (to && !to.includes('_')) {
        toD = stringToDate(to).getTime();

        /** Если дата ПО меньше даты С, ставим дату ПО на 1 день больше даты С*/
        if (toD < fromD) {
          toD = fromD + 24 * 3600 * 1000;
        }

        if (maxDate && toD > maxDate.getTime()) {
          toD = maxDate.getTime();
        }

        to = formatDate(toD).date;
      }

      if (from || to) {
        result = [from, to].join(' - ');
      }
    } else {
      const d = stringToDate(date);

      if (date !== '' && minDate && d.getTime() < minDate.getTime()) {
        result = formatDate(minDate.getTime()).date;
      }

      if (maxDate && d.getTime() > maxDate.getTime()) {
        result = formatDate(maxDate.getTime()).date;
      }
    }

    return result;
  };

  /** Проверяем и подставляем defaultValue */
  useEffect(() => {
    if (!defaultValue) {
      return;
    }

    let inputValue = parseToFormat(defaultValue).string;

    if (!inputValue.includes('_')) {
      inputValue = validate(parseToFormat(defaultValue).string);
    }

    setInputValue(inputValue);
  }, [defaultValue, minDate, maxDate]);

  // -------------------------------------------------------------------------------------------------------------------

  const getReturnValue = (value: string, range: boolean): IDateVariants => {
    if (range) {
      const [from, to] = value.split(' - ');
      const fromD = stringToDate(from).getTime();
      const toD = stringToDate(to).getTime();
      return {
        value,
        date: {
          from: new Date(fromD),
          to: new Date(toD),
          value: new Date(fromD)
        },
        timestamp: {
          from: fromD,
          to: toD,
          value: fromD
        }
      };
    }

    const date = stringToDate(value);
    return {
      date: {
        from: date,
        to: date,
        value: date
      },
      value,
      timestamp: {
        from: date.getTime(),
        to: date.getTime(),
        value: date.getTime()
      }
    };
  };

  const onDatepickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let result = e.target.value;

    if (range || (result.length === 10 && !result.includes('_'))) {
      result = validate(result);
    }

    setInputValue(result);
  };

  const setValue = (value: string) => {
    setInputValue(validate(value));
  };

  useEffect(() => {
    if (!inputValue.includes('_') && inputValue !== '') {
      const result = getReturnValue(inputValue, range);
      onChange && onChange(result, name);
      fireOnChange();
    } else {
      if (showDayOfWeek) {
        setDayOfWeek([]);
      }
    }
  }, [inputValue, showDayOfWeek]);

  const fireOnChange = () => {
    setTimeout(() => {
      if (inputRef.current) {
        const input = inputRef.current.querySelector('input');

        if (input) {

          let event;

          if (typeof (Event) === 'function') {
            event = new Event('change');
          } else {
            event = document.createEvent('Event');
            event.initEvent('change', true, true);
          }

          input.dispatchEvent(event);
        }
      }
    }, 100);
  };

  // -------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (showDayOfWeek) {
      if (!range) {
        if (!inputValue.includes('_') && inputValue !== '') {
          const result = getReturnValue(inputValue, range);
          const dayFrom = result.date.value.getDay();
          setDayOfWeek([getWeekDay(dayFrom, locale)]);
        }
      } else {
        const [fromValue, toValue] = inputValue.split(' - ');


        if (fromValue && !fromValue.includes('_')) {
          const from = getReturnValue(fromValue, false);
          const dayFrom = from.date.from.getDay();
          setDayOfWeek([getWeekDay(dayFrom, locale)]);
        }

        if (toValue && !toValue.includes('_')) {
          const to = getReturnValue(toValue, false);
          const dayTo = to.date.from.getDay();
          setDayOfWeek([...dayOfWeek, getWeekDay(dayTo, locale)]);
        }
      }
    }
  }, [inputValue, showDayOfWeek, range]);

  // -------------------------------------------------------------------------------------------------------------------

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13 || e.charCode === 13 || e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  let mask, fromMask, toMask;

  if (range) {
    const defaultFromMask = [
      /[0-3]/,
      inputValue[0] === '3' ? /[0,1]/ : inputValue[0] === '0' ? /[1-9]/ : /[0-9]/,
      '.',
      /[0,1]/,
      inputValue[3] === '0' ? /[1-9]/ : /[0-2]/,
      '.',
      /[1,2]/,
      /\d/,
      /\d/,
      /\d/
    ];

    const defaultToMask = [
      /[0-3]/,
      inputValue[13] === '3' ? /[0,1]/ : inputValue[13] === '0' ? /[1-9]/ : /[0-9]/,
      '.',
      /[0,1]/,
      inputValue[16] === '0' ? /[1-9]/ : /[0-2]/,
      '.',
      /[1,2]/,
      /\d/,
      /\d/,
      /\d/
    ];

    fromMask = defaultFromMask;
    toMask = defaultToMask;

    if (showDayOfWeek) {

      if (dayOfWeek[0]) {
        fromMask.push(' ');

        for (let i = 0; i < dayOfWeek[0].length; i++) {
          fromMask.push(dayOfWeek[0][i]);
        }

      } else {
        fromMask = defaultFromMask;
      }

      if (dayOfWeek[1]) {
        toMask.push(' ');

        for (let i = 0; i < dayOfWeek[1].length; i++) {
          toMask.push(dayOfWeek[1][i]);
        }
      } else {
        toMask = defaultToMask;
      }
    }

    mask = [
      ...fromMask,
      ' ',
      '-',
      ' ',
      ...toMask,
    ];

  } else {
    const defaultMask = [
      /[0-3]/,
      inputValue[0] === '3' ? /[0,1]/ : inputValue[0] === '0' ? /[1-9]/ : /[0-9]/,
      '.',
      /[0,1]/,
      inputValue[3] === '0' ? /[1-9]/ : /[0-2]/,
      '.',
      /[1,2]/,
      /\d/,
      /\d/,
      /\d/
    ];

    mask = defaultMask;

    if (showDayOfWeek) {
      if (dayOfWeek[0]) {
        mask.push(' ');

        for (let i = 0; i < dayOfWeek[0].length; i++) {
          mask.push(dayOfWeek[0][i]);
        }
      } else {
        mask = defaultMask;
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------

  const disabledClass = disabled ? 'rf-datepicker__input-wrapper--disabled' : '';
  const readOnlyClass = readOnly ? 'rf-datepicker__input-wrapper--readonly' : '';

  return (
    <div className='rf-datepicker' ref={datepickerRef}>
      <div className={`rf-datepicker__input-wrapper ${disabledClass} ${readOnlyClass}`}
        ref={inputRef}
        onFocus={() => toggleCalendar(true)}>
        <InputMask
          mask={mask}
          name={name}
          placeholder={placeholder}
          value={inputValue}
          disabled={disabled}
          readOnly={readOnly}
          onKeyPress={onKeyPress}
          onChange={onDatepickerChange}>
          <Input size={size}/>
        </InputMask>
        <Calendar className='rf-datepicker__calendar-button'/>
      </div>
      {showCalendar && (
        <DatepickerCalendar
          value={inputValue}
          minDate={minDate}
          maxDate={maxDate}
          toggleRef={inputRef}
          setInputValue={setValue}
          range={range}
          locale={locale}
          showCalendar={showCalendar}
          toggleCalendar={toggleCalendar}/>
      )}
    </div>
  );
};

export default NewDatepicker;
