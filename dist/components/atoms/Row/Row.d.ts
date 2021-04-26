import React, { FC } from 'react';
export interface IRowProps {
    /** Дочерние элементы */
    children: React.ReactNode | React.ReactNode[];
    /** Горизонтальный отступ */
    gap?: number;
    /** Вертикальный отступ */
    mb?: number;
    /** Выравнивание по вертикальной оси */
    align?: 'top' | 'middle' | 'bottom';
    /** Выравнивание по горизонтальной оси */
    justify?: 'left' | 'center' | 'right' | 'between' | 'around';
    /** Дополнительный класс */
    className?: string;
}
declare const Row: FC<IRowProps>;
export default Row;
