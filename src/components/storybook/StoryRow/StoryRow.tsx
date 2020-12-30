import React, { ReactNode } from 'react';
import './StoryRow.scss';

interface IProps {
  children: ReactNode | ReactNode[];
}

const StoryRow: React.FC<IProps> = ({ children }: IProps) => {
  return <div className='story__row'>{children}</div>;
};

export default StoryRow;
