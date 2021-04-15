import React, { ReactNode } from 'react';
interface IProps {
    containerSelector: string;
    /** Контейнер со сроллом, по-умолчанию = window */
    scrollContainer?: string;
    children?: ReactNode | ReactNode[];
    top?: number;
    bottom?: number;
}
declare const StickyContainer: React.FC<IProps>;
export default StickyContainer;
