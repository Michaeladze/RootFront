import React, { ReactNode } from 'react';
import './Container.scss';

interface IProps {
  children: ReactNode | ReactNode[];
}

/** Компонент-обертка, ограничивает ширину контента */
const Container: React.FC<IProps> = ({ children }: IProps) => {
  return <div className='container'>{children}</div>;
};

export default Container;
