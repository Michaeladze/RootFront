import React, { FC } from 'react';
import './Row.scss';

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

const Row: FC<IRowProps> = ({
  children,
  gap = 0,
  mb = 0,
  align = 'top',
  justify = 'left',
  className = ''
}: IRowProps) => {
  let alignClass = '';
  switch (align) {
  case 'top':
    alignClass = 'rf-row--top';
    break;
  case 'middle':
    alignClass = 'rf-row--middle';
    break;
  case 'bottom':
    alignClass = 'rf-row--bottom';
    break;
  default:
    alignClass = '';
  }

  let justifyClass = '';
  switch (justify) {
  case 'left':
    justifyClass = 'rf-row--left';
    break;
  case 'center':
    justifyClass = 'rf-row--center';
    break;
  case 'right':
    justifyClass = 'rf-row--right';
    break;
  case 'between':
    justifyClass = 'rf-row--between';
    break;
  case 'around':
    justifyClass = 'rf-row--around';
    break;
  default:
    justifyClass = '';
  }

  return (
    <div className={`rf-row ${alignClass} ${justifyClass} ${className}`} style={{ margin: `0 -${gap}px ${mb}px` }}>
      {children}
    </div>
  );
};

export default Row;
