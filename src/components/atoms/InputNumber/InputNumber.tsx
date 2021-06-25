import React, {
  useEffect, useRef, useState
} from 'react';
import './InputNumber.scss';
import { IInputProps } from '../Input/Input';
import { Input, numberWithSpaces } from '../../../index';

export interface IInputNumberProps extends IInputProps {
  defaultValue?: string | number;
  separator?: string;
  floatPoints?: number;
  groupBy?: number;
  max?: number;
  onInputChange?: (value: string) => void;
}

const InputNumber: React.FC<IInputNumberProps> = ({
  max,
  defaultValue = '',
  separator = ' ',
  floatPoints = 0,
  groupBy = 3,
  onInputChange,
  ...props
}: IInputNumberProps) => {

  const input = useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<string | number>(defaultValue);

  // -------------------------------------------------------------------------------------------------------------------

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    let value = e.target.value;

    /** Исключить все буквы алфавита */
    if (isNaN(+value.replace(/\s/g, ''))) {
      e.preventDefault();
      return;
    }

    if (floatPoints === 0 && value.includes('.')) {
      const idx = value.indexOf('.');
      value = value.slice(0, idx);
    }

    /** Исключить повторение точек */
    const dotMap: Record<string, number> = { '.': 0 };

    for (let i = 0; i < value.length; i++) {
      if (!dotMap[value[i]]) {
        dotMap[value[i]] = 1;
      } else {
        dotMap[value[i]]++;
      }
    }

    if (dotMap['.'] > 1) {
      return;
    }

    const values = value.split('.');

    const value1: string = values[0].replace(/\s/g, '');
    let value2: string = values[1];

    let result = '';

    if (value1) {
      const integer = +value1;

      /** Исключить экспоненциальные значения и infinity */
      if (integer > Number.MAX_SAFE_INTEGER) {
        return;
      }

      if (value2 && value2.toString().length > floatPoints) {
        value2 = value2.slice(0, floatPoints);
      }

      const float = +value2;
      result = isNaN(float) ? numberWithSpaces(integer, groupBy, separator) : [numberWithSpaces(integer, groupBy, separator), value2].join('.');
    }

    onInputChange && onInputChange(value);
    setValue(result);
  };

  // -------------------------------------------------------------------------------------------------------------------

  const handleDefault = (v: string | number) => {
    const val: string = v.toString();

    if (val.includes('.')) {
      const values = val.split('.');
      const result = [numberWithSpaces(+values[0]), values[1]].join('.');
      setValue(result);
    } else {
      val ? setValue(numberWithSpaces(+val)) : setValue(val);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      handleDefault(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (max && +value.toString().replace(/\s/g, '') > max) {
      handleDefault(max);
    }
  }, [value]);

  useEffect(() => {
    setInputValue(value.toString().replace(/\s/g, ''));
  }, [value]);

  useEffect(() => {
    if (!input.current) {
      return;
    }

    let event;

    if (typeof (Event) === 'function') {
      event = new Event('change');
    } else {
      event = document.createEvent('Event');
      event.initEvent('change', true, true);
    }

    input.current.dispatchEvent(event);
  }, [inputValue]);

  // -------------------------------------------------------------------------------------------------------------------

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13 || e.charCode === 13 || e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // -------------------------------------------------------------------------------------------------------------------


  return (
    <>
      <Input
        { ...props }
        value={ value }
        placeholder={ props.placeholder }
        disabled={ props.disabled }
        readOnly={ props.readOnly }
        onChange={ onChange }
        onKeyPress={ onKeyPress }
      />
      <input type='text' className='rf-number-input__hidden' name={ props.name } value={ inputValue } ref={ input }
        readOnly/>
    </>
  );
};

export default InputNumber;
