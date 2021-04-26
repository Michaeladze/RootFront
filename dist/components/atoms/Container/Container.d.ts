import React, { ReactNode } from 'react';
interface IProps {
    children: ReactNode | ReactNode[];
}
import './Container.scss';
/** Компонент-обертка, ограничивает ширину контента */
declare const Container: React.FC<IProps>;
export default Container;
