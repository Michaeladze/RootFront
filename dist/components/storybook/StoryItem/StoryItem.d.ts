import React, { ReactNode } from 'react';
import './StoryItem.scss';
interface IProps {
    subtitle?: string;
    description?: string;
    children: ReactNode | ReactNode[];
}
declare const StoryItem: React.FC<IProps>;
export default StoryItem;
