import React, { ReactNode } from 'react';
import './Story.scss';
interface IProps {
    name: string;
    width?: number;
    height?: number;
    description?: string;
    children: ReactNode | ReactNode[];
}
declare const Story: React.FC<IProps>;
export default Story;
