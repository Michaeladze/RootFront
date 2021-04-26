import React from 'react';
import './Preloader.scss';
import { Size, Variant } from '../../../types';
export interface IPreloaderProps {
    className?: string;
    size?: Size;
    variant?: Variant;
}
declare const Preloader: React.FC<IPreloaderProps>;
export default Preloader;
