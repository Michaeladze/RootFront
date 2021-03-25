import React, { FC } from 'react';
export interface IColumn {
    /** Дочерние элементы */
    children: React.ReactNode | React.ReactNode[];
    /** Размер колонки на мобильных */
    sm?: number | 'auto';
    /** Размер колонки на планшетах */
    md?: number | 'auto';
    /** Размер колонки на десктопе */
    lg?: number | 'auto';
    /** Горизонтальный отступ */
    gap?: number;
    /** Выравнивание по вертикальной оси */
    align?: 'top' | 'middle' | 'bottom';
    /** Дополнительный класс */
    className?: string;
}
declare const Column: FC<IColumn>;
export default Column;
