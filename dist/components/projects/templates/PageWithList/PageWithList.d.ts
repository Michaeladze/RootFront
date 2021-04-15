import React, { ReactNode } from 'react';
interface IProps {
    /** Наполнение */
    children: ReactNode | ReactNode[];
    /** Панель с  фильтрами */
    filters?: ReactNode;
    /** Fixed action menu */
    actionMenu?: ReactNode;
    preloader?: boolean;
}
declare const PageWithList: React.FC<IProps>;
export default PageWithList;
