import React from 'react';
import { DateFormat, Size } from '../../../types';
import { IDateVariants } from '../../../types/projects.types';
export interface IDatepickerProps {
    /** Название */
    name?: string;
    placeholder?: string;
    /** Значение по умолчанию */
    defaultValue?: Date | string | number;
    disabled?: boolean;
    readOnly?: boolean;
    /** Размер */
    size?: Size;
    /** Минимальная дата */
    min?: Date | string | number;
    /** Максимальная дата */
    max?: Date | string | number;
    /** Возвращает дату */
    onChange?: (value: IDateVariants, name?: string) => void;
    /** Диапазон */
    range?: boolean;
    /** Формат */
    format?: DateFormat;
    /** Показать день недели */
    showDayOfWeek?: boolean;
    /** Язык */
    locale?: 'ru' | 'en';
}
declare const NewDatepicker: React.FC<IDatepickerProps>;
export default NewDatepicker;
