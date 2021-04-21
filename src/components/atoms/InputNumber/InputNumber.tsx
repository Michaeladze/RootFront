import React, { useState } from 'react';
import './InputNumber.scss';
import { IInputProps } from '../Input/Input';
import { Input, numberWithSpaces } from '../../../index';

export interface IInputNumberProps extends IInputProps {
  defaultValue?: string | number;
  separator?: string;
  floatPoints?: number;
}

const InputNumber: React.FC<IInputNumberProps> = ({ defaultValue = '', separator = ' ', floatPoints = 2, ...props }: IInputNumberProps) => {

  const [value, setValue] = useState<string | number>(defaultValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    let value = e.target.value;

    /** Исключить все буквы алфавита */
    if (isNaN(+value.replace(/\s/g, ''))) {
      e.preventDefault();
      return;
    }


    value = value.replace(/,/g, '.');

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
    const value2: string = values[1];

    let result = '';

    if (value1) {
      const integer = +value1;

      /** Исключить экспоненциальные значения и infinity */
      if (integer > Number.MAX_SAFE_INTEGER) {
        return;
      }

      if (value2 && value2.toString().length > floatPoints) {
        return;
      }

      const float = +value2;
      result = isNaN(float) ? numberWithSpaces(integer, 3, separator) : [numberWithSpaces(integer, 3, separator), value2].join('.');
    }

    setValue(result);
  };

  // -------------------------------------------------------------------------------------------------------------------

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13 || e.charCode === 13 || e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // -------------------------------------------------------------------------------------------------------------------


  return (
    <Input
      {...props}
      value={value}
      name={ props.name }
      placeholder={ props.placeholder }
      disabled={ props.disabled }
      readOnly={ props.readOnly }
      onChange={ onChange }
      onKeyPress={ onKeyPress }
    />
  );
};

export default InputNumber;
