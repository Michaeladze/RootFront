import React, { ReactNode } from 'react';
import './StoryItem.scss';

interface IProps {
  subtitle?: string;
  description?: string;
  children: ReactNode | ReactNode[];
}

const StoryItem: React.FC<IProps> = ({ subtitle, description, children }: IProps) => {
  return (
    <div className='story__item'>
      {subtitle && <h4 className='story__subtitle'>{subtitle}</h4>}
      {description && <p className='story__description'>{description}</p>}
      <div className='story__content'>{children}</div>
    </div>
  );
};

export default StoryItem;
