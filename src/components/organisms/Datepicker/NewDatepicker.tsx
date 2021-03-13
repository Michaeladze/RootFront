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


export interface IDatepickerProps {
  name?: string;
  placeholder?: string;
  defaultValue?: Date | string | number;
  /** Размер */
  size?: Size;
  /** Минимальная дата */
  min?: Date | string | number;
  /** максимальная */
  max?: Date | string | number;
}

const NewDatepicker: React.FC<IDatepickerProps> = ({
  name = 'datepicker',
  placeholder = 'Выберите дату',
  size = 'medium',
  defaultValue
}: IDatepickerProps) => {

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

    setInputValue(inputValue);
  }, [defaultValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newStr = e.target.value;
    setInputValue((oldStr: string) => {
      const len = newStr.length;
      const lastChar = newStr[newStr.length - 1];

      if (!lastChar) {
        return '';
      }

      const key = lastChar.charCodeAt(0);
      const isDelete = oldStr.length > newStr.length;

      if (!isDelete && (key < 47 || key > 57)) {
        return oldStr;
      }

      if (!isDelete && len !== 1 && len !== 3) {
        if (key === 47) {
          return oldStr;
        }
      }

      if (!isDelete && len === 2) {
        newStr += '.';
      }

      if (!isDelete && len === 5) {
        newStr += '.';
      }

      return newStr;
    });
  };

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='rf-datepicker' ref={datepickerRef}>
      <div className='rf-datepicker__input-wrapper' ref={inputRef} onClick={() => toggleCalendar(true)}>
        <Input name={name}
          debounce={0}
          maxLength={10}
          placeholder={placeholder}
          value={inputValue}
          onChange={onChange}

          className={`${sizeClass[size]}`}/>
        <Calendar className='rf-datepicker__calendar-button'/>
      </div>
      {showCalendar && <DatepickerCalendar value={inputValue} setInputValue={setInputValue} toggleCalendar={toggleCalendar}/>}
    </div>
  );
};

export default NewDatepicker;
