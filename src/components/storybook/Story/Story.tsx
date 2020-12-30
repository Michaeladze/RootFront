import React, { ReactNode } from 'react';
import './Story.scss';

interface IProps {
  name: string;
  width?: number;
  height?: number;
  description?: string;
  children: ReactNode | ReactNode[];
}

const Story: React.FC<IProps> = ({
  name, description, width, height, children
}: IProps) => {
  const style = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%'
  };

  return (
    <div className='story' style={style}>
      <h2 className='story__name'>{name}</h2>
      {description && <p className='story__description'>{description}</p>}
      <div className='story__wrapper'>{children}</div>
    </div>
  );
};

export default Story;
