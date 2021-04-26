import React from 'react';
import './List.scss';
import { IListElement } from '../../../types';
interface IProps {
    /** Элементы меню */
    list: IListElement[];
}
declare const List: React.FC<IProps>;
export default List;
