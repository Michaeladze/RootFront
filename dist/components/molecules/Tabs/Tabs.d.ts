import { FC, ReactNode } from 'react';
import { ITab } from '../../../types';
import './Tabs.scss';
export interface ITabsProps {
    /** Список вкладок */
    list: ITab[];
    /** Вид табов */
    type?: 'underline' | 'buttons';
    /** Если во вкладках есть url, то через children пробрасывается <Router/> */
    children?: ReactNode | ReactNode[];
}
declare const Tabs: FC<ITabsProps>;
export default Tabs;
