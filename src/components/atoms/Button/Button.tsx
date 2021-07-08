import React, { FC, HTMLProps } from 'react';
import { Size, Variant } from '../../../types';
import { sizeClass, variantClass } from '../../../utils/helpers';
import './Button.scss';
export interface IButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  /** Внешний вид */
  buttonType?: 'primary' | 'secondary' | 'link' | 'outlinePrimary' | 'outlineSecondary' | 'round' | 'text';
  /** Тип */
  type?: 'button' | 'submit' | 'reset';
  /** Варианты */
  variant?: Variant;
  /** Размер */
  size?: Size;
  /** 100% ширина */
  fullWidth?: boolean;
}

const Button: FC<IButtonProps> = ({
  type = 'button',
  size = 'medium',
  fullWidth = false,
  buttonType = 'primary',
  variant = buttonType === 'text' ? 'base' : 'accent',
  ...props
}: IButtonProps) => {
  const classesMap: { [key: string]: string } = {
    primary: 'rf-button--primary',
    secondary: 'rf-button--secondary',
    link: 'rf-button--link',
    outlinePrimary: 'rf-button--outline-primary',
    outlineSecondary: 'rf-button--outline-secondary',
    text: 'rf-button--text',
    round: 'rf-button--round'
  };

  const widthClass = fullWidth ? 'rf-button__full-width' : '';

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <button
      {...props}
      type={type}
      className={`rf-button ${classesMap[buttonType]} ${sizeClass[size]} ${variantClass[variant]} ${widthClass} ${
        props.className || ''
      }`}>
      {props.children}
    </button>
  );
};

export default Button;
