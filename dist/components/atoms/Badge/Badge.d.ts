import React, { ReactNode } from 'react';
import { Variant } from '../../../types';
export interface IBadgeProps {
    children: ReactNode;
    badgeContent?: ReactNode;
    className?: string;
    variant?: Variant;
    max?: number;
    position?: 'topRight' | 'topLeft' | 'bottomLeft' | 'bottomRight' | 'text';
    display?: boolean;
    placeNear?: boolean;
}
declare const Badge: React.FC<IBadgeProps>;
export default Badge;
