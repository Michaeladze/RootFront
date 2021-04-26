import React, { ReactNode } from 'react';
import { Size, Variant } from '../../../types';
import { sizeClass, variantClass } from '../../../utils/helpers';
import './Tag.scss';


export interface ITagProps {
  children: ReactNode | ReactNode[];
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
}

const Tag: React.FC<ITagProps> = ({ children, onClick, variant = 'base', size = 'medium' }: ITagProps) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick && onClick();
  };

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className={`rf-tag ${variantClass[variant]} ${sizeClass[size]}`} onClick={handleClick}>
      {children}
    </div>
  );
};

export default Tag;
