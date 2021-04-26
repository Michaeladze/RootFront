import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './List.scss';
import { IListElement } from '../../../types';
import { MenuContext } from '../../molecules/Menu/Menu';

interface IProps {
  /** Элементы меню */
  list: IListElement[];
}

const List: React.FC<IProps> = ({ list }: IProps) => {
  const onElementClick = (e: React.MouseEvent, li: IListElement) => {
    e.stopPropagation();
    !li.url && e.preventDefault();
    li.handler && li.handler();
    onClose && onClose();
  };

  const { onClose } = useContext(MenuContext);

  const listElementJSX =
    list &&
    list.map((li: IListElement, i: number) => {
      const disabledClass = li.disabled ? 'rf-list__element--disabled' : '';
      const separatedClass = li.separated ? 'rf-list__element--separated' : '';

      return (
        <li className='rf-li' key={li.value || i}>
          {li.separated && <div className='rf-list__separator' />}
          {
            li.url ? (
              <NavLink to={li.url}
                className={`rf-list__element ${disabledClass} ${separatedClass}`}
                onClick={(e: React.MouseEvent) => onElementClick(e, li)}> {li.label} </NavLink>
            ) : (
              <div
                className={`rf-list__element ${disabledClass} ${separatedClass}`}
                onClick={(e: React.MouseEvent) => onElementClick(e, li)}>
                {li.label}
              </div>
            )
          }
        </li>
      );
    });

  // -------------------------------------------------------------------------------------------------------------------

  return <ul className='rf-list'>{listElementJSX}</ul>;
};

export default List;
