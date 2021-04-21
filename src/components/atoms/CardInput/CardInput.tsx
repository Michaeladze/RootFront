import React, {
  useCallback, useEffect, useState
} from 'react';
import './CardInput.scss';
import { IInputProps } from '../Input/Input';
import { Input } from '../../../index';
import InputMask from 'react-input-mask';


export interface ICardInputProps extends Omit<IInputProps, 'type'> {
  type?: 'account' | 'card';
  defaultValue?: string;
}

const CardInput: React.FC<ICardInputProps> = ({
  type = 'account',
  defaultValue = '',
  ...props
}: ICardInputProps) => {

  const parseDefaultValue = useCallback(() => {
    let result = defaultValue;

    switch (typeof defaultValue) {
    case 'number':
      debugger;
      result = result.toString();
      break;
    case 'string':
      break;
    default:
      result = '';
      break;
    }

    return result;
  }, [defaultValue]);


  const [value, setValue] = useState<string | number>(parseDefaultValue());

  useEffect(() => {
    setValue(parseDefaultValue());
  }, [defaultValue]);


  // -------------------------------------------------------------------------------------------------------------------

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13 || e.charCode === 13 || e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // -------------------------------------------------------------------------------------------------------------------

  let mask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  if (type === 'account') {
    mask = [
      ...mask,
      ...[
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]
    ];
  }

  const placeholder: string = type === 'account' ? '0000 0000 0000 0000  0000' : '0000 0000 0000 0000';

  // -------------------------------------------------------------------------------------------------------------------

  return (
    // @ts-ignore
    <InputMask maskPlaceholder=' '
      mask={ mask }
      name={ props.name }
      placeholder={ props.placeholder || placeholder }
      value={ value }
      disabled={ props.disabled }
      readOnly={ props.readOnly }
      onKeyPress={ onKeyPress }
      onChange={ onChange }>
      <Input size={ props.size }/>
    </InputMask>
  );
};

export default CardInput;
