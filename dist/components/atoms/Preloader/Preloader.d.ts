import React from 'react';
import { Size, Variant } from '../../../types';
import './Preloader.scss';
export interface IPreloaderProps {
    className?: string;
    size?: Size;
    variant?: Variant;
}
declare const Preloader: React.FC<IPreloaderProps>;
export default Preloader;
