import React, {
  FC, InputHTMLAttributes, ReactNode
} from 'react';
import CheckIcon from '../../_icons/check-icon';
import { Variant } from '../../../types';
import { variantClass } from '../../../utils/helpers';

export interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Лейбл */
  label?: React.ReactNode;
  /** Значение */
  value?: string;
  /** HTML Элемент вместо строки */
  node?: ReactNode;
  /** Отображение иконки */
  icon?: boolean;
  /** Вариант */
  variant?: Variant;
}

const Checkbox: FC<ICheckboxProps> = ({
  label, value, node, icon = true, variant = 'accent', ...props
}: ICheckboxProps) => {
  /** Отображение иконки */
  const withIcon = icon ? (
    <span className={`rf-checkbox__check ${variantClass[variant]} ${node ? 'rf-checkbox__check--node' : ''}`}>
      <span className='rf-checkbox__mark'>
        <CheckIcon />
      </span>
    </span>
  ) : (
    ''
  );

  const disabledClass = props.disabled ? 'disabled' : '';

  return (
    <label className={`rf-checkbox ${props.className || ''} ${disabledClass} `}>
      <input {...props} type='checkbox' className='rf-checkbox__input' value={value} />

      {withIcon}

      {label && <div className={`rf-checkbox__label ${node ? 'rf-checkbox__label--node' : ''}`}>{node || label}</div>}
    </label>
  );
};

export default Checkbox;
