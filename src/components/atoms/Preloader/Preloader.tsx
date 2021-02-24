import React from 'react';
import { Size, Variant } from '../../../types';
import { sizeClass, variantClass } from '../../../utils/helpers';

export interface IPreloaderProps {
  className?: string;
  size?: Size;
  variant?: Variant;
}

const Preloader: React.FC<IPreloaderProps> = ({ className = '', size = 'medium', variant = 'accent' }: IPreloaderProps) => {
  return (
    <div className={`preloader ${sizeClass[size]} ${variantClass[variant]} ${className}`}>
      <div className='preloader__circle' />
    </div>
  );
};

export default Preloader;
