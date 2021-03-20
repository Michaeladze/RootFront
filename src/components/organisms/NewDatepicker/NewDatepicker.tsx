import React, {
  useCallback,
  useEffect, useRef, useState
} from 'react';
import './NewDatepicker.scss';
import { formatDate, Input } from '../../../index';
import { Size } from '../../../types';
import { replaceAt, sizeClass } from '../../../utils/helpers';
import Calendar from '../../_icons/calendar-outline';
import DatepickerCalendar from '../DatepickerCalendar';
import useClickOutside from '../../../hooks/useClickOutside';
import InputMask from 'react-input-mask';
import { IDateVariants } from '../DatepickerCalendar/datepicker.types';

export interface IDatepickerProps {
  name?: string;
  placeholder?: string;
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
  getValue?: (value: IDateVariants) => void;
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
  getValue,
  range = false
}: IDatepickerProps) => {
  const minD: Date | undefined = min ? min instanceof Date ? min : new Date(min) : undefined;
  const maxD: Date | undefined = max ? max instanceof Date ? max : new Date(max) : undefined;
  const minDate: Date | undefined = minD ? new Date(minD.getFullYear(), minD.getMonth(), minD.getDate()) : undefined;
  const maxDate: Date | undefined = maxD ? new Date(maxD.getFullYear(), maxD.getMonth(), maxD.getDate()) : undefined;

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
    const [dd, mm, yyyy] = date.split('.');

    if (minDate && new Date(+yyyy, +mm - 1, +dd).getTime() < minDate.getTime()) {
      result = formatDate(minDate.getTime()).date;
    }

    if (maxDate && new Date(+yyyy, +mm, +dd).getTime() > maxDate.getTime()) {
      result = formatDate(maxDate.getTime()).date;
    }

    return result;
  };

  /** Проверяем и подставляем defaultValue */
  useEffect(() => {
    let inputValue = '';

    /** Заменить на точки символы, находящиеся на 2 и 5 позициях  */
    if (typeof defaultValue === 'string') {
      let newInputValue = defaultValue;

      if (newInputValue[2] !== '.') {
        newInputValue = replaceAt(newInputValue, 2, '.');
      }

      if (newInputValue[5] !== '.') {
        newInputValue = replaceAt(newInputValue, 5, '.');
      }

      inputValue = newInputValue;
    }

    if (typeof defaultValue === 'number') {
      inputValue = formatDate(defaultValue).date;
    }

    if (defaultValue instanceof Date) {
      inputValue = formatDate(defaultValue.getTime()).date;
    }

    inputValue = validate(inputValue);

    setInputValue(inputValue);
  }, [defaultValue]);

  // -------------------------------------------------------------------------------------------------------------------

  const getReturnValue = (value: string): IDateVariants => {
    const [dd, mm, yyyy] = value.split('.');
    const date = new Date(`${mm}.${dd}.${yyyy}`);
    return {
      date,
      value,
      timestamp: date.getTime()
    };
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value.length === 10 && !e.target.value.includes('_')) {
      const result = validate(e.target.value);

      if (e.target.value !== result) {
        setInputValue(result);
      }

      getValue && getValue(getReturnValue(result));
    }
  };

  const setValue = (value: string) => {
    setInputValue(value);
    getValue && getValue(getReturnValue(value));

    setTimeout(() => {
      if (inputRef.current) {
        const input = inputRef.current.querySelector('input');

        if (input) {
          input.dispatchEvent(new Event('change'));
        }
      }
    }, 100);
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
    inputValue[13] === '3' ? /[0,1]/ : inputValue[0] === '0' ? /[1-9]/ : /[0-9]/,
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
          onChange={onChange}>
          <Input className={`${sizeClass[size]}`}/>
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
