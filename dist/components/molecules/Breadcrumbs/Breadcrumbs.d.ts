import React from 'react';
import './Breadcrumbs.scss';
import { IBreadcrumb } from '../../../types';
export interface IProps {
    list: IBreadcrumb[];
}
declare const Breadcrumbs: React.FC<IProps>;
export default Breadcrumbs;
