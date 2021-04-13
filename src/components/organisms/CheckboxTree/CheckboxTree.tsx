import React, { useEffect, useState } from 'react';
import { ITreeOption } from '../../../types';
import Folder from './Folder';

interface ITreeProps {
  /** Список */
  list: ITreeOption[];
  /** Состояние открыт/закрыт */
  open?: boolean;
  /** Изменение состояние */
  onChange?: (value: ITreeOption[]) => void;
}

const CheckboxTree: React.FC<ITreeProps> = ({
  list,
  open,
  onChange
}: ITreeProps) => {

  const [state, setState] = useState<ITreeOption[]>([]);

  // ---------------------------------------------------------------------------------------------------------------------------------------

  /** Рекурсивно определяем, какие чекбоксы нужно чекнуть/хафчекнуть по дефолту */
  useEffect(() => {
    const recursiveCheck = (list: ITreeOption[] | undefined, parent?: ITreeOption) => {
      if (!list) {
        return;
      }

      for (let i = 0; i < list.length; i++) {
        list[i].parent = parent;

        if (list[i].checked) {
          changeParentsFlags(list[i]);
          changeChildrenFlags(true, list[i].children);
          continue;
        }

        recursiveCheck(list[i].children, list[i]);
      }
    };
    recursiveCheck(list);
    setState(list);
  }, [list]);


  // ---------------------------------------------------------------------------------------------------------------------------------------

  /**
   * Компонент CheckboxTree рекурсивно мутирует list, добавляя в каждый элемент свойство parent. Так как на уровне текущего компонента CheckboxTree
   * необходимо делать глубокое копирование для создания нового state, все рекурсии нужно удалить.
   * */
  const clearRecursion = (list: ITreeOption[]) => {
    list.forEach((o: ITreeOption) => {
      delete o.parent;

      if (o.children) {
        clearRecursion(o.children);
      }
    });
  };

  // ---------------------------------------------------------------------------------------------------------------------------------------

  /** Изменяем флаги, поднимаясь вверх по дереву */
  const changeParentsFlags = (item: ITreeOption) => {
    const parent = item.parent;

    if (parent && parent.children) {
      const checkedChildren = parent.children.filter((o: ITreeOption) => o.checked);
      parent.checked = checkedChildren.length === parent.children.length;
      parent.hasCheckedChild = (checkedChildren.length !== parent.children.length && checkedChildren.length > 0) || !!item.hasCheckedChild;

      changeParentsFlags(parent);
    }
  };

  /** Изменяем флаги, спускаясь вниз по дереву */
  const changeChildrenFlags = (flag: boolean, items?: ITreeOption[]) => {
    if (items) {
      items.forEach((o: ITreeOption) => {
        o.checked = flag;
        o.hasCheckedChild = false;
        changeChildrenFlags(flag, o.children);
      });
    }
  };

  // ---------------------------------------------------------------------------------------------------------------------------------------

  /** Основная функция изменения состояния компонента */
  const handleChange = (flag: boolean, item: ITreeOption) => {
    item.checked = flag;
    changeParentsFlags(item);
    changeChildrenFlags(flag, item.children);

    clearRecursion(state);
    const result: ITreeOption[] = JSON.parse(JSON.stringify(state));
    onChange && onChange(result);
    setState(result);
  };

  // ---------------------------------------------------------------------------------------------------------------------------------------

  return (
    <Folder list={state} onChange={handleChange} open={open}/>
  );
};

export default CheckboxTree;
