import React, { FC } from 'react';
import { Variant } from '../../../types';
export interface IProps {
    className?: string;
    variant?: Variant;
    children: React.ReactNode | React.ReactNode[];
}
declare const Message: FC<IProps>;
export default Message;
