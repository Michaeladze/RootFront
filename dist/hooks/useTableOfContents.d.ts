import React from 'react';
export interface IHeadingData {
    id: string;
    htmlNode: HTMLElement;
}
export interface IUseTableOfContentsProps {
    container: React.RefObject<HTMLElement>;
    selector: string;
    additionalOffset?: number;
    deps?: any[];
}
export interface IActiveTitle {
    activeTitleId?: string;
    activeIndex: number;
}
declare const useTableOfContents: ({ container, selector, additionalOffset, deps }: IUseTableOfContentsProps) => IActiveTitle;
export default useTableOfContents;
