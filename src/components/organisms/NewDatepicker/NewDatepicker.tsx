import React, {
  useCallback,
  useEffect, useRef, useState
} from 'react';
import { formatDate, Input } from '../../../index';
import { Size } from '../../../types';
import Calendar from '../../_icons/calendar-outline';
import DatepickerCalendar from '../DatepickerCalendar';
import useClickOutside from '../../../hooks/useClickOutside';
import InputMask from 'react-input-mask';
import { IDateVariants } from '../../../types/projects.types';
import { parseToFormat } from '../DatepickerCalendar/datepicker.utils';
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
}

const NewDatepicker: React.FC<IDatepickerProps> = ({
  name = 'datepicker',
  placeholder = 'Выберите дату',
  size = 'medium',
  defaultValue,
  min,
  max,
  disabled = false,
  readOnly = false,
  onChange,
  range = false
}: IDatepickerProps) => {

  const [minDate, setMinDate] = useState<Date | undefined>(undefined);
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setMinDate(min ? parseToFormat(min).date : undefined);
  }, [min]);

  useEffect(() => {
    if (max) {
      setMaxDate(max ? parseToFormat(max).date : undefined);
    }
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
      onChange && onChange(getReturnValue(inputValue, range), name);
      fireOnChange();
    }
  }, [inputValue]);

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

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13 || e.charCode === 13 || e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  const disabledClass = disabled ? 'rf-datepicker__input-wrapper--disabled' : '';
  const readOnlyClass = readOnly ? 'rf-datepicker__input-wrapper--readonly' : '';

  const mask = range ? [
    /[0-3]/,
    inputValue[0] === '3' ? /[0,1]/ : inputValue[0] === '0' ? /[1-9]/ : /[0-9]/,
    '.',
    /[0,1]/,
    inputValue[3] === '0' ? /[1-9]/ : /[0-2]/,
    '.',
    /[1,2]/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    '-',
    ' ',
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
  ] : [
    /[0-3]/,
    inputValue[0] === '3' ? /[0,1]/ : inputValue[0] === '0' ? /[1-9]/ : /[0-9]/,
    '.',
    /[0,1]/,
    inputValue[3] === '0' ? /[1-9]/ : /[0-2]/,
    '.',
    /[1,2]/,
    /\d/,
    /\d/,
    /\d/,
  ];

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='rf-datepicker' ref={datepickerRef}>
      <div className={`rf-datepicker__input-wrapper ${disabledClass} ${readOnlyClass}`}
        ref={inputRef} onClick={() => toggleCalendar(true)}>
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
          showCalendar={showCalendar}
          toggleCalendar={toggleCalendar}/>
      )}
    </div>
  );
};

export default NewDatepicker;
