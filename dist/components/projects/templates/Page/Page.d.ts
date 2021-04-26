import React, { ReactNode } from 'react';
import { IUser } from '../../../../types/projects.types';
import { IListElement, ITab } from '../../../../types';
import './Page.scss';
export interface IPageProps {
    title?: ReactNode;
    className?: string;
    backUrl?: string;
    onBackUrlClick?: () => void;
    children?: ReactNode | ReactNode[];
    user?: IUser;
    /** Список действий в дропдауне пользователя */
    actionsList?: IListElement[];
    /** Положение меню пользователя слева или справа */
    menuPosition?: 'left' | 'right';
    /** Navigation */
    navigation?: ITab[];
    preloader?: boolean;
}
declare const Page: React.FC<IPageProps>;
export default Page;
