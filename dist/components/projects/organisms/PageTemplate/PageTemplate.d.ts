import React, { ReactNode } from 'react';
import { IBreadcrumb } from '../../../../types';
export interface IProps {
    /** Название*/
    title: ReactNode;
    /** Путь */
    breadcrumbs?: IBreadcrumb[];
    /** Ссылка на предыдущую страницу*/
    backUrl?: string;
    /** Спрятать все кнопки */
    onlyTitle?: boolean;
    /** Класс */
    className?: string;
    /** Наполнение */
    children: ReactNode | ReactNode[];
}
declare const PageTemplate: React.FC<IProps>;
export default PageTemplate;
