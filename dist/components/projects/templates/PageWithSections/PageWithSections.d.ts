import React, { ReactNode } from 'react';
import { IPageSection } from '../../../../types/projects.types';
interface IPageWithSectionsProps {
    sections?: IPageSection[];
    /** Fixed action menu */
    actionMenu?: ReactNode;
    preloader?: boolean;
}
declare const PageWithSections: React.FC<IPageWithSectionsProps>;
export default PageWithSections;
