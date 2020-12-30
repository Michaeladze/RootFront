import React from 'react';
import { Variant } from '../../../types';
import { variantClass } from '../../../utils/helpers';

export interface IPreloaderProps {
  size?: 'small' | 'medium' | 'large';
  variant?: Variant;
}

const Preloader: React.FC<IPreloaderProps> = ({ size = 'medium', variant = 'accent' }: IPreloaderProps) => {
  return (
    <div className={`preloader preloader--${size} ${variantClass[variant]}`}>
      <div className='preloader__circle' />
    </div>
  );
};

export default Preloader;
