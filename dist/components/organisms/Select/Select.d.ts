import React, { FC, InputHTMLAttributes } from 'react';
import { IOption, Size } from '../../../types';
export interface ISelectProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Список вариантов */
    options: IOption[];
    /** Множественный выбор */
    multiSelect?: boolean;
    /** Начальное значение */
    value?: string | string[];
    /** Изменение значение селекта */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, option?: IOption) => void;
    /** Вернуть IOption */
    getValue?: (option: IOption) => void;
    /** Размер */
    size?: Size;
    /** Событие на удаление чипсы */
    onChipsRemove?: (id: string, name?: string) => void;
}
declare const Select: FC<ISelectProps>;
export default Select;
