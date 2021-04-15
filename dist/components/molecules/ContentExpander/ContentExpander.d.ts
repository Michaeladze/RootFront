import React, { ReactNode } from 'react';
export interface IContentExpanderProps {
    title: ReactNode;
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
