import React, { FC } from 'react';
import './FormGroupInline.scss';
export interface IFormGroupInlineProps {
    /** Дочерние элементы */
    children: React.ReactNode | React.ReactNode[];
    /** Имя */
    label?: React.ReactNode;
    /** Сообщение об ошибке */
    errorMessage?: string;
    /** Дополнительный класс */
    className?: string;
    /** Обязательность */
    required?: boolean;
}
declare const FormGroupInline: FC<IFormGroupInlineProps>;
export default FormGroupInline;
