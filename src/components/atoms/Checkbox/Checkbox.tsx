import React, { FC, InputHTMLAttributes } from 'react';
import './Checkbox.scss';
import CheckIcon from '../../_icons/check-icon';
import { Variant } from '../../../types';
import { variantClass } from '../../../utils/helpers';
import MinusIcon from '../../_icons/minus';

export interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Лейбл */
  label?: React.ReactNode;
  /** Значение */
  value?: string;
  /** Отображение иконки */
  icon?: boolean;
  /** Вариант */
  variant?: Variant;
  /** Вертикальное выравнивание */
  align?: 'flex-start' | 'center' | 'flex-end';
  /** Если дочерние чекбоксы чекнуты, флаг равен true */
  halfChecked?: boolean;
  /** Положение чекбокса */
  position?: 'left' | 'right';
  /** Круглый чекбокс */
  round?: boolean;
}

const Checkbox: FC<ICheckboxProps> = ({
  label,
  value,
  icon = true,
  variant = 'accent',
  align = 'flex-start',
  halfChecked = false,
  position = 'left',
  round = false,
  ...props
}: ICheckboxProps) => {

  const roundClass = round ? 'rf-checkbox__check--round' : '';

  /** Отображение иконки */
  const checkIcon = !halfChecked && icon && (
    <span className={`rf-checkbox__check ${variantClass[variant]} ${roundClass}`}>
      <span className='rf-checkbox__mark'>
        <CheckIcon/>
      </span>
    </span>
  );

  /** Иконка полу-чека */
  const halfCheckIcon = halfChecked && icon && (
    <span className={`rf-checkbox__half-check ${variantClass[variant]}`}>
      <MinusIcon/>
    </span>
  );

  const disabledClass = props.disabled ? 'disabled' : '';
  const alignClass: Record<string, string> = {
    'flex-start': 'rf-checkbox--flex-start',
    'center': 'rf-checkbox--center',
    'flex-end': 'rf-checkbox--flex-end',
  };
  const showIconClass = icon ? '' : 'rf-checkbox__label--no-icon';
  const positionClass = position === 'left' ? 'rf-checkbox--left' : 'rf-checkbox--right';

  return (
    <label className={`rf-checkbox ${props.className || ''} ${disabledClass} ${alignClass[align]} ${positionClass}`}>
      <input {...props} type='checkbox' className='rf-checkbox__input' value={value}/>

      {checkIcon}
      {halfCheckIcon}

      {label && <div className={`rf-checkbox__label ${showIconClass}`}>{label}</div>}
    </label>
  );
};

export default Checkbox;
