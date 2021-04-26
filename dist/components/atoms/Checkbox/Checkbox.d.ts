import React, { FC, InputHTMLAttributes, ReactNode } from 'react';
import { Variant } from '../../../types';
import './Checkbox.scss';
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
    /** Если дочерние чекбоксы чекнуты, флаг равен true */
    halfChecked?: boolean;
}
declare const Checkbox: FC<ICheckboxProps>;
export default Checkbox;
