import React from 'react';
import Preloader from '../Preloader';
import { Variant } from '../../../types';

export interface IBackdropLoaderProps {
  className?: string;
  variant?: Variant;
}

const BackdropLoader: React.FC<IBackdropLoaderProps> = ({ className = '', variant }: IBackdropLoaderProps) => {


  // -------------------------------------------------------------------------------------------------------------------


  return (
    <div className={`rf__backdrop-loader ${className}`}>
      <Preloader size='large' variant={variant}/>
    </div>
  );
};

export default BackdropLoader;
