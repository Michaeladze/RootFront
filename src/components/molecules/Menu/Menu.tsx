import React, {
  ReactNode, useCallback, useLayoutEffect, useRef, useState
} from 'react';
import { IListElement, IMenuContext } from '../../../types';
import { useClickOutside } from '../../../index';
import List from '../../atoms/List';

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
export const MenuContext = React.createContext<IMenuContext>({ onClose: () => {} });

const Menu: React.FC<IListProps> = ({
  list,
  children,
  content,
  position = 'left',
  className = '',
  relativeBlock = document.body
}: IListProps) => {
  /** Выпадающий список */
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  /** Флаг отображения выпадающего списка  */
  const [show, toggle] = useState<boolean>(false);

  /** Клик по кнопке */
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggle();
  };

  /** Изменение состояния выпадающего списка */
  const onToggle = () => {
    toggle(!show);
  };

  const onClose = () => {
    toggle(false);
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Функция для отслеживания клика вне элемента */
  const handleClickOutside = useCallback(() => {
    onClose();
  }, [toggle]);

  useClickOutside(menuRef, handleClickOutside);

  // -------------------------------------------------------------------------------------------------------------------

  const clearCoordinates = () => {
    return position === 'left' ?
      {
        top: '-99999px',
        left: '0',
        right: 'auto'
      } :
      {
        top: '-99999px',
        left: 'auto',
        right: '0'
      };
  };

  const [coordinates, setCoordinates] = useState(clearCoordinates());

  /** Пересчитываем координаты, если не помещается*/
  const rearrangePosition = () => {
    if (contentRef.current && toggleRef.current) {
      const toggleRect: DOMRect = toggleRef.current.getBoundingClientRect();
      const listRect: DOMRect = contentRef.current.getBoundingClientRect();

      let left = 0;
      let right = 0;
      let top: number = toggleRect.height;
      const minGap = 10;

      if (toggleRect.height + toggleRect.top + listRect.height > relativeBlock.offsetHeight) {
        top =
          toggleRect.height -
          (toggleRect.height + toggleRect.top + listRect.height - relativeBlock.offsetHeight) -
          minGap;
      }

      if (position === 'left') {
        if (toggleRect.left + listRect.width > relativeBlock.offsetWidth) {
          left = relativeBlock.offsetWidth - listRect.width - toggleRect.left - minGap;
        }

        setCoordinates({
          left: `${left}px`,
          top: `${top}px`,
          right: 'auto'
        });
      } else {
        if (listRect.left < 0) {
          right = listRect.left - minGap;
        }

        setCoordinates({
          left: 'auto',
          top: `${top}px`,
          right: `${right}px`
        });
      }
    }
  };

  useLayoutEffect(() => {
    if (show) {
      rearrangePosition();
    } else {
      setCoordinates(clearCoordinates());
    }
  }, [show]);
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className={`rf-menu ${className}`} ref={menuRef}>
      <div className='rf-menu__toggle' onClick={onClick} ref={toggleRef}>
        {children}
      </div>
      <div className={`rf-menu__content ${show ? 'rf-menu__content--show' : ''}`} style={coordinates} ref={contentRef}>
        <MenuContext.Provider value={{ onClose }}>
          {content ? content : list && list.length > 0 && <List list={list} />}
        </MenuContext.Provider>
      </div>
    </div>
  );
};

export default Menu;
