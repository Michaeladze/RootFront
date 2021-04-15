import React, { ReactNode } from 'react';
interface IProps {
    children: ReactNode | ReactNode[];
}
/** Компонент-обертка, ограничивает ширину контента */
declare const Container: React.FC<IProps>;
export default Container;
