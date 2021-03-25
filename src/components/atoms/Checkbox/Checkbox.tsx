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
  /** Вертикальное выравнивание */
  align?: 'flex-start' | 'center' | 'flex-end';
}

const Checkbox: FC<ICheckboxProps> = ({
  label, value, node, icon = true, variant = 'accent', align = 'flex-start', ...props
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
  const alignClass: Record<string, string> = {
    'flex-start': 'rf-checkbox--flex-start',
    'center': 'rf-checkbox--center',
    'flex-end': 'rf-checkbox--flex-end',
  };

  return (
    <label className={`rf-checkbox ${props.className || ''} ${disabledClass} ${alignClass[align]} `}>
      <input {...props} type='checkbox' className='rf-checkbox__input' value={value} />

      {withIcon}

      {label && <div className={`rf-checkbox__label ${node ? 'rf-checkbox__label--node' : ''}`}>{node || label}</div>}
    </label>
  );
};

export default Checkbox;
