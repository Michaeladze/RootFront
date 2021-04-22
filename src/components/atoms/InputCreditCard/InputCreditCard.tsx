import React, {
  useEffect, useRef, useState
} from 'react';
import { IInputProps } from '../Input/Input';
import { Input } from '../../../index';
import InputMask from 'react-input-mask';


export interface ICardInputProps extends Omit<IInputProps, 'type'> {
  type?: 'account' | 'card';
  defaultValue?: string;
}

const InputCreditCard: React.FC<ICardInputProps> = ({
  type = 'account',
  defaultValue = '',
  ...props
}: ICardInputProps) => {

  const input = useRef<HTMLInputElement | null>(null);


  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
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
    setInputValue(e.target.value.replace(/\s/g, ''));

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
    <>
      {/* @ts-ignore */}
      <InputMask maskPlaceholder=' '
        mask={ mask }
        placeholder={ props.placeholder || placeholder }
        value={ value }
        disabled={ props.disabled }
        readOnly={ props.readOnly }
        onKeyPress={ onKeyPress }
        onChange={ onChange }>
        <Input size={ props.size }/>
      </InputMask>
      <input type='hidden' className='rf-card-input__hidden' name={ props.name } value={inputValue} ref={input} readOnly/>
    </>
  );
};

export default InputCreditCard;
