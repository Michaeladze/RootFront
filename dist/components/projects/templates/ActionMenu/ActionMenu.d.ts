import React, { ReactNode } from 'react';
import { IActionMenuListConfig } from '../../../../types/projects.types';
import './ActionMenu.scss';
interface IActionMenuProps {
    type?: 'default' | 'list' | 'action';
    listConfig?: IActionMenuListConfig;
    children?: ReactNode | ReactNode[];
}
declare const ActionMenu: React.FC<IActionMenuProps>;
export default ActionMenu;
