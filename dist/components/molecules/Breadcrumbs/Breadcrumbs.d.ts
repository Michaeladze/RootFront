import React from 'react';
import { IBreadcrumb } from '../../../types';
import './Breadcrumbs.scss';
export interface IProps {
    list: IBreadcrumb[];
}
declare const Breadcrumbs: React.FC<IProps>;
export default Breadcrumbs;
