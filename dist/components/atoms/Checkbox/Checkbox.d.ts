import React, { FC, InputHTMLAttributes, ReactNode } from 'react';
import { Variant } from '../../../types';
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
declare const Checkbox: FC<ICheckboxProps>;
export default Checkbox;
