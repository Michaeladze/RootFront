import React, { ReactNode } from 'react';
import { IListElement, IMenuContext } from '../../../types';
export interface IListProps {
    /** Кнопка открытия меню */
    children: ReactNode;
    /** Элементы меню */
    list?: IListElement[];
    /** Компонент вместо списка */
    content?: ReactNode;
    /** Класс */
    className?: string;
    /** Положение слева или справа */
    position?: 'left' | 'right';
    /** Блок, относительно которого выравнивается меню */
    relativeBlock?: HTMLElement;
}
/** Контекст для передачи функций работы с меню. */
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<IListProps>;
export default Menu;
