import React, { ReactNode } from 'react';

export interface ITileProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

const Tile: React.FC<ITileProps> = ({ children, className = '' }: ITileProps) => {
  return <div className={`rf-tile ${className}`}>{children}</div>;
};

export default Tile;
