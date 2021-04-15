import React, { FC } from 'react';
export interface IFormGroup {
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
declare const FormGroup: FC<IFormGroup>;
export default FormGroup;
