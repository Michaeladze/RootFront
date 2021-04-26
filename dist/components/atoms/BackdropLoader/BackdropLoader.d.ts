import React from 'react';
import './BackdropLoader.scss';
import { Variant } from '../../../types';
export interface IBackdropLoaderProps {
    className?: string;
    variant?: Variant;
}
declare const BackdropLoader: React.FC<IBackdropLoaderProps>;
export default BackdropLoader;
