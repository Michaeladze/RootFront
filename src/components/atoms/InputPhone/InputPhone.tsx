import React, {
  useEffect, useRef, useState
} from 'react';
import './InputPhone.scss';
import { IInputProps } from '../Input/Input';
import { Input, Select } from '../../../index';
import InputMask from 'react-input-mask';
import { IOption } from '../../../types';

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

export interface IInputPhoneProps extends IInputProps {
  defaultValue?: string;
}

const InputPhone: React.FC<IInputPhoneProps> = ({ defaultValue = '', ...props }: IInputPhoneProps) => {

  /** Ссылка на текущий компонент */
  const componentNode = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [value, setValue] = useState<string>(defaultValue);

  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValue(defaultValue.slice(2, defaultValue.length));
  }, [defaultValue]);

  useEffect(() => {
    setInputValue(countryCodes[0].value + value.replace(/(\s|-|_|\(|\))/g, ''));
  }, [value]);

  // -------------------------------------------------------------------------------------------------------------------

  const [countryCode, setCountryCode] = useState<string>(countryCodes[0].value);
  const onSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = value.replace(/(\s|-|\(|\))/g, '');
    const phone = e.target.value + body;
    setInputValue(phone);
    setCountryCode(e.target.value);
  };

  const mask = [
    '(',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    ')',
    ' ',
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    ' ',
    '-',
    ' ',
    /[0-9]/,
    /[0-9]/,
    ' ',
    '-',
    ' ',
    /[0-9]/,
    /[0-9]/
  ];

  // -------------------------------------------------------------------------------------------------------------------

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = e.target.value.replace(/(\s|-|_|\(|\))/g, '');
    const phone = countryCode + body;
    setInputValue(phone);
    setValue(e.target.value);
  };

  // -------------------------------------------------------------------------------------------------------------------

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13 || e.charCode === 13 || e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

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

  const [isFocus, setFocus] = useState<boolean>(false);

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const focusClass: string = isFocus ? 'rf-phone-input--focus' : '';

  // -------------------------------------------------------------------------------------------------------------------

  /** Валидация в форме */
  useEffect(() => {
    if (componentNode.current) {
      const input = componentNode.current.querySelector(`.rf-input__field[name="${props.name}"]`);

      if (input) {
        const invalid: boolean = input.classList.contains('invalid');

        if (invalid) {
          componentNode.current.classList.add('invalid');
        }
      }
    }
  });

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className={`rf-phone-input ${focusClass}`} onFocus={onFocus} onBlur={onBlur} ref={componentNode}>
      <div className='rf-phone-input__select'>
        <Select
          disabled
          value={countryCodes[0].value}
          onChange={onSelectChange}
          options={countryCodes}
          readOnly/>
      </div>
      <div className='rf-phone-input__field'>
        {/* @ts-ignore */}
        <InputMask mask={mask}
          value={value}
          placeholder={ props.placeholder }
          disabled={ props.disabled }
          readOnly={ props.readOnly }
          onChange={ onChange }
          onKeyPress={ onKeyPress }>
          <Input name={ props.name } />
        </InputMask>
        <input type='hidden' className='rf-phone-input__hidden' value={inputValue} ref={input} readOnly/>
      </div>
    </div>
  );
};

export default InputPhone;
