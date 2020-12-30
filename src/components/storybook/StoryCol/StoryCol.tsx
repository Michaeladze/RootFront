import React, { ReactNode } from 'react';
import './StoryCol.scss';

interface IProps {
  children: ReactNode | ReactNode[];
}

const StoryCol: React.FC<IProps> = ({ children }: IProps) => {
  return <div className='story__col'>{children}</div>;
};

export default StoryCol;
