import { FC, InputHTMLAttributes, ReactNode } from 'react';
import { Variant } from '../../../types';
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
declare const Radio: FC<IRadioProps>;
export default Radio;
