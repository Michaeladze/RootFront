import React, {
  FC, InputHTMLAttributes, ReactNode
} from 'react';
import CheckIcon from '../../_icons/check-icon';
import { Variant } from '../../../types';
import { variantClass } from '../../../utils/helpers';
import './Radio.scss';
export interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Лейбл */
  label: ReactNode;
  /** Значение */
  value: string;
  /** HTML Элемент вместо строки */
  node?: ReactNode;
  /** Отображение иконки */
  icon?: boolean;
  /** Вариант */
  variant?: Variant;
}

const Radio: FC<IRadioProps> = ({
  label, value, node, icon = true, variant = 'accent', ...props
}: IRadioProps) => {
  /** Отображение иконки */
  const withIcon = icon ? (
    <span className={`rf-radio__circle ${variantClass[variant]}`}>
      <span className='rf-radio__mark'>
        <CheckIcon />
      </span>
    </span>
  ) : (
    ''
  );

  return (
    <label className={`rf-radio ${props.className || ''} ${props.disabled ? 'disabled' : ''}`}>
      <input {...props} type='radio' className='rf-radio__input' value={value} />

      {withIcon}

      <span className={`rf-radio__label ${node ? 'rf-radio__label--node' : ''}`}>{node || label}</span>
    </label>
  );
};

export default Radio;
