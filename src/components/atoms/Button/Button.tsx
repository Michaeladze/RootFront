import React, { FC, HTMLProps } from 'react';
import { Size, Variant } from '../../../types';
import { sizeClass, variantClass } from '../../../utils/helpers';

export interface IButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  /** Внешний вид */
  buttonType?: 'primary' | 'secondary' | 'link' | 'outlinePrimary' | 'outlineSecondary' | 'round' | 'text';
  /** Тип */
  type?: 'button' | 'submit' | 'reset';
  /** Варианты */
  variant?: Variant;
  /** Размер */
  size?: Size;
}

const Button: FC<IButtonProps> = ({
  type = 'button',
  size = 'medium',
  buttonType = 'primary',
  variant = 'accent',
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

  return (
    <button
      {...props}
      type={type}
      className={`rf-button ${classesMap[buttonType]} ${sizeClass[size]} ${variantClass[variant]} ${
        props.className || ''
      }`}>
      {props.children}
    </button>
  );
};

export default Button;
