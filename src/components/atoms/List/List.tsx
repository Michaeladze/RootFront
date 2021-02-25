import React, { useContext } from 'react';
import { IListElement } from '../../../types';
import { MenuContext } from '../../molecules/Menu/Menu';
import './List.scss';

interface IProps {
  /** Элементы меню */
  list: IListElement[];
}

const List: React.FC<IProps> = ({ list }: IProps) => {
  const onElementClick = (e: React.MouseEvent, handler?: () => void) => {
    e.stopPropagation();
    e.preventDefault();
    handler && handler();
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
          <div
            className={`rf-list__element ${disabledClass} ${separatedClass}`}
            onClick={(e: React.MouseEvent) => onElementClick(e, li.handler)}>
            {li.label}
          </div>
        </li>
      );
    });

  // -------------------------------------------------------------------------------------------------------------------

  return <ul className='rf-list'>{listElementJSX}</ul>;
};

export default List;
