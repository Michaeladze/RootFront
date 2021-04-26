import React, { ReactNode } from 'react';

export interface ITileProps {
  children: ReactNode | ReactNode[];
  className?: string;
  type?: 'default' | 'stretch';
}
import './Tile.scss';
const Tile: React.FC<ITileProps> = ({ children, className = '', type = 'default' }: ITileProps) => {
  const stretchClass = type === 'stretch' ? 'rf-tile--stretch' : '';
  return <div className={`rf-tile ${stretchClass} ${className}`}>{children}</div>;
};

export default Tile;
