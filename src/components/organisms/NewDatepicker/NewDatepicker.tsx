import React, {
  useCallback,
  useEffect, useRef, useState
} from 'react';
import { formatDate, Input } from '../../../index';
import { Size } from '../../../types';
import { replaceAt } from '../../../utils/helpers';
import Calendar from '../../_icons/calendar-outline';
import DatepickerCalendar from '../DatepickerCalendar';
import useClickOutside from '../../../hooks/useClickOutside';
import InputMask from 'react-input-mask';
import { IDateVariants } from '../../../types/projects.types';

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
  min?: Date;
  /** Максимальная дата */
  max?: Date;
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

    if (range) {
      const [from, to] = date.split(' - ');

      if (from && to && !from.includes('_') && !to.includes('_')) {
        const [dd1, mm1, yyyy1] = from.split('.');

        const [dd2, mm2, yyyy2] = to.split('.');
        let fromD = new Date(`${mm1}.${dd1}.${yyyy1}`).getTime();
        let toD = new Date(`${mm2}.${dd2}.${yyyy2}`).getTime();


        /** Если дата ПО меньше даты С, ставим дату ПО на 1 день больше даты С*/
        if (toD < fromD) {
          toD = fromD + 24 * 3600 * 1000;
        }

        if (minDate && fromD < minDate.getTime()) {
          fromD = minDate.getTime();
        }

        if (maxDate && fromD > maxDate.getTime()) {
          fromD = minDate ? minDate.getTime() : maxDate.getTime();
        }

        if (maxDate && toD > maxDate.getTime()) {
          toD = maxDate.getTime();
        }


        result = `${formatDate(fromD).date} - ${formatDate(toD).date}`;
      }
    } else {
      const [dd, mm, yyyy] = date.split('.');

      if (minDate) {

        if (minDate && date === '' || new Date(+yyyy, +mm - 1, +dd).getTime() < minDate.getTime()) {
          result = formatDate(minDate.getTime()).date;
        }
      }

      if (maxDate && new Date(+yyyy, +mm - 1, +dd).getTime() > maxDate.getTime()) {
        result = formatDate(maxDate.getTime()).date;
      }
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

  const getReturnValue = (value: string, range: boolean): IDateVariants => {
    if (range) {
      const [from, to] = value.split(' - ');
      const [dd1, mm1, yyyy1] = from.split('.');
      const [dd2, mm2, yyyy2] = to.split('.');
      const fromD = new Date(`${mm1}.${dd1}.${yyyy1}`).getTime();
      const toD = new Date(`${mm2}.${dd2}.${yyyy2}`).getTime();
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

    const [dd, mm, yyyy] = value.split('.');
    const date = new Date(`${mm}.${dd}.${yyyy}`);
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
    setInputValue(e.target.value);

    if (!e.target.value.includes('_') && e.target.value !== '') {
      const result = validate(e.target.value);

      if (e.target.value !== result) {
        setInputValue(result);
      }

      onChange && onChange(getReturnValue(result, range), name);
    }
  };

  const setValue = (value: string) => {
    setInputValue(value);

    if (!value.includes('_') && value !== '') {
      onChange && onChange(getReturnValue(value, range), name);

      setTimeout(() => {
        if (inputRef.current) {
          const input = inputRef.current.querySelector('input');

          if (input) {
            input.dispatchEvent(new Event('change'));
          }
        }
      }, 100);
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
