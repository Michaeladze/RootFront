import React, { FC, InputHTMLAttributes } from 'react';
import './Select.scss';
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
    /** Изменение значение инпута */
    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** Вернуть IOption */
    getValue?: (option: IOption) => void;
    /** Размер */
    size?: Size;
    /** Событие на удаление чипсы */
    onChipsRemove?: (id: string, name?: string) => void;
    /** Возможность добавлять опции */
    creatable?: boolean;
    /** Обратотка создания новой опции  */
    onCreateOption?: (option: IOption) => void;
    /** Сообщение создания новой опции */
    saveOptionMessage?: string;
    /** Префикс для value кастомных опций */
    customPrefix?: string;
}
declare const Select: FC<ISelectProps>;
export default Select;
