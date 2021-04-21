import React, { useEffect, useState } from 'react';
import './InputPhone.scss';
import { IInputProps } from '../Input/Input';
import { Input, Select } from '../../../index';
import { IOption } from '../../../types';
import InputMask from 'react-input-mask';


export interface IInputPhoneProps extends IInputProps {
  defaultValue?: string;
  getValue?: (item: string) => void;
}

const InputPhone: React.FC<IInputPhoneProps> = ({ defaultValue = '', getValue, ...props }: IInputPhoneProps) => {


  const [value, setValue] = useState<string>(defaultValue);

  // -------------------------------------------------------------------------------------------------------------------

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;

    setValue(value);
  };

  // -------------------------------------------------------------------------------------------------------------------

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13 || e.charCode === 13 || e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  const countryCodes: IOption[] = [
    {
      label: '+7',
      value: '+7'
    },
    {
      label: '+8',
      value: '+8'
    },
    {
      label: '+9',
      value: '+9'
    }
  ];

  const [countryCode, setCountryCode] = useState<string>(countryCodes[0].value);
  const onSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryCode(e.target.value);
  };

  const mask = [
    '(',
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    ')',
    ' ',
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    ' ',
    '-',
    ' ',
    /[1-9]/,
    /[1-9]/,
    ' ',
    '-',
    ' ',
    /[1-9]/,
    /[1-9]/
  ];

  // -------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const r = value.replace(/(\s|-|\(|\))/g, '');

    if (value && !r.includes('_')) {
      getValue && getValue(countryCode + r);
    }
  }, [value, countryCode]);

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='input-phone'>
      <div className='input-phone__select'>
        <Select
          value={countryCode}
          onChange={onSelectChange}
          options={countryCodes}
          readOnly/>
      </div>
      <div className='input-phone__input'>
        {/* @ts-ignore */}
        <InputMask mask={mask}
          {...props}
          name={ props.name }
          value={value}
          placeholder={ props.placeholder }
          disabled={ props.disabled }
          readOnly={ props.readOnly }
          onChange={ onChange }
          onKeyPress={ onKeyPress }>
          <Input/>
        </InputMask>
      </div>
    </div>
  );
};

export default InputPhone;
