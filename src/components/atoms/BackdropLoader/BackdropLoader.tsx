import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader';
import { Variant } from '../../../types';
import { createPortal } from 'react-dom';

export interface IBackdropLoaderProps {
  className?: string;
  variant?: Variant;
}

const BackdropLoader: React.FC<IBackdropLoaderProps> = ({ className = '', variant }: IBackdropLoaderProps) => {

  const [div] = useState<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(div);
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
      document.body.removeChild(div);
    };
  });

  const loader = (
    <div className={`rf__backdrop-loader ${className}`}>
      <Preloader size='big' variant={variant}/>
    </div>
  );
  // -------------------------------------------------------------------------------------------------------------------

  return createPortal(loader, div);
};

export default BackdropLoader;
