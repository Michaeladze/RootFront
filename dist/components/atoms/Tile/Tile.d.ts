import React, { ReactNode } from 'react';
export interface ITileProps {
    children: ReactNode | ReactNode[];
    className?: string;
    type?: 'default' | 'stretch';
}
declare const Tile: React.FC<ITileProps>;
export default Tile;
