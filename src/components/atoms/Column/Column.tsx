import React, { FC } from 'react';
import './Column.scss';

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

const Column: FC<IColumn> = ({
  children, sm, md, lg, gap, align, className = ''
}) => {
  /** Класс для выравнивания колонки в контейнере */
  let alignClass = '';
  switch (align) {
  case 'top':
    alignClass = 'rf-col--top';
    break;
  case 'middle':
    alignClass = 'rf-col--middle';
    break;
  case 'bottom':
    alignClass = 'rf-col--bottom';
    break;
  default:
    alignClass = '';
  }

  /** Классы для размеров колонок */
  const smClass = sm ? `rf-col-sm-${sm}` : 'rf-col-sm-auto';
  const mdClass = md ? `rf-col-md-${md}` : 'rf-col-md-auto';
  const lgClass = lg ? `rf-col-lg-${lg}` : 'rf-col-lg-auto';

  return (
    <div
      className={`rf-col ${smClass} ${mdClass} ${lgClass} ${alignClass} ${className}`}
      style={{
        paddingLeft: `${gap}px`,
        paddingRight: `${gap}px`
      }}>
      {children}
    </div>
  );
};

export default Column;
