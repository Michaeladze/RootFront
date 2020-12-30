import React, { FC, HTMLProps } from 'react';
import { Variant } from '../../../types';
import { variantClass } from '../../../utils/helpers';

export interface IButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  /** Внешний вид */
  buttonType?: 'primary' | 'secondary' | 'link' | 'outlinePrimary' | 'outlineSecondary' | 'round' | 'text';
  /** Размер */
  size?: 'giant' | 'large' | 'medium' | 'small' | 'tiny';
  /** Тип */
  type?: 'button' | 'submit' | 'reset';
  /** Скругленная */
  rounded?: boolean;
  /** Варианты */
  variant?: Variant;
}

const Button: FC<IButtonProps> = ({
  type = 'button',
  size = 'medium',
  buttonType = 'primary',
  variant = 'accent',
  rounded = false,
  ...props
}: IButtonProps) => {
  const classesMap: { [key: string]: string } = {
    primary: 'rf-button--primary',
    secondary: 'rf-button--secondary',
    link: 'rf-button--link',
    outlinePrimary: 'rf-button--outline-primary',
    outlineSecondary: 'rf-button--outline-secondary',
    text: 'rf-button--text',
    round: 'rf-button--round',

    giant: 'rf-button__giant',
    large: 'rf-button__large',
    medium: 'rf-button__medium',
    small: 'rf-button__small',
    tiny: 'rf-button__tiny'
  };

  const roundedClass = rounded ? 'rf-button__rounded' : '';

  return (
    <button
      {...props}
      type={type}
      className={`rf-button ${classesMap[buttonType]} ${classesMap[size]} ${variantClass[variant]} ${roundedClass} ${
        props.className || ''
      }`}>
      {props.children}
    </button>
  );
};

export default Button;
