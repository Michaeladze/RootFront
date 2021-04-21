import React, { useState } from 'react';
import { IInputProps } from '../Input/Input';
import { Input, numberWithSpaces } from '../../../index';

export interface IInputNumberProps extends IInputProps {
  defaultValue?: string;
  separator?: string;
  floatPoints?: number;
  groupBy?: number;
}

const InputNumber: React.FC<IInputNumberProps> = ({ defaultValue = '', separator = ' ', floatPoints = 0, groupBy = 3, ...props }: IInputNumberProps) => {

  const [value, setValue] = useState<string>(defaultValue);

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
