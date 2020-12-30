import React, { FC } from 'react';
import { Variant } from '../../../types';
import { variantClass } from '../../../utils/helpers';

export interface IProps {
  className?: string;
  variant?: Variant;
  children: React.ReactNode | React.ReactNode[];
}

const Message: FC<IProps> = ({ children, variant = 'info', className = '' }: IProps) => {
  return (
    <div className={`rf-message ${variantClass[variant]} ${className}`}>
      <div className='rf-message__message'>{children}</div>
    </div>
  );
};

export default Message;
