import React, { ReactNode } from 'react';
import './ContentExpander.scss';
export interface IContentExpanderProps {
    title: ReactNode;
    showTitle?: boolean;
    children: ReactNode | ReactNode[];
    disabled?: boolean;
    defaultValue?: boolean;
    onExpand?: () => void;
    expanded?: boolean;
    stickArrow?: boolean;
    className?: string;
}
declare const ContentExpander: React.FC<IContentExpanderProps>;
export default ContentExpander;
