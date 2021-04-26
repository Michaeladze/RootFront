import React from 'react';
import { IListElement } from '../../../types';
import './List.scss';
interface IProps {
    /** Элементы меню */
    list: IListElement[];
}
declare const List: React.FC<IProps>;
export default List;
