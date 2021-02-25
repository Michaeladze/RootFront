import React, { FC, HTMLProps } from 'react';
import classes from './Button.module.scss';
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

  const className = props.className || '';

  return (
    <button
      {...props}
      type={type}
      className={`${classes['rf-button']} ${classes[classesMap[buttonType]]} ${classes[sizeClass[size]]} ${classes[variantClass[variant]]} ${className}`}>
      {props.children}
    </button>
  );
};

export default Button;
