import React, { ReactNode } from 'react';
import { Size, Variant } from '../../../types';
export interface ITagProps {
    children: ReactNode | ReactNode[];
    onClick?: () => void;
    variant?: Variant;
    size?: Size;
}
declare const Tag: React.FC<ITagProps>;
export default Tag;
