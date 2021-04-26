import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode | ReactNode[];
}
import './Container.scss';
/** Компонент-обертка, ограничивает ширину контента */
const Container: React.FC<IProps> = ({ children }: IProps) => {
  return <div className='container'>{children}</div>;
};

export default Container;
