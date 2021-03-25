import React from 'react';
import { IBreadcrumb } from '../../../types';
export interface IProps {
    list: IBreadcrumb[];
}
declare const Breadcrumbs: React.FC<IProps>;
export default Breadcrumbs;
