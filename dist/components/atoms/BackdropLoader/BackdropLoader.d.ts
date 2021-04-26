import React from 'react';
import { Variant } from '../../../types';
import './BackdropLoader.scss';
export interface IBackdropLoaderProps {
    className?: string;
    variant?: Variant;
}
declare const BackdropLoader: React.FC<IBackdropLoaderProps>;
export default BackdropLoader;
