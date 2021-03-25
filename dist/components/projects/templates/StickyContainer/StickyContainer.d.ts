import React, { ReactNode } from 'react';
interface IProps {
    containerSelector: string;
    children?: ReactNode | ReactNode[];
    top?: number;
    bottom?: number;
}
declare const StickyContainer: React.FC<IProps>;
export default StickyContainer;
