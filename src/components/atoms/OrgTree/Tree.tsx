import React from 'react';
import { ITreeOption } from '../../../types';
import TreeItem from './TreeItem';

export interface ITreeProps {
  /** Уникальный ID */
  id: string;
  /** Список */
  list: ITreeOption[];
  /** Глубина вложенности */
  depth?: number;
  /** Состояние открыт/закрыт */
  open?: boolean;
  /** Родительский элемент */
  parent?: ITreeOption;
  /** Обновление структуры */
  onChange?: (o: ITreeOption) => void;
  /** Активная запись */
  activeItem?: ITreeOption | undefined;
}

const Folder: React.FC<ITreeProps> = ({ id, list, onChange, parent, depth = 0, open = true, activeItem }: ITreeProps) => {

  // ---------------------------------------------------------------------------------------------------------------------------------------

  /** Базовый размер отступа слева */
  const PADDING_LEFT_BASE = 22;
  const style = { paddingLeft: depth === 0 ? 0 : PADDING_LEFT_BASE };

  // ---------------------------------------------------------------------------------------------------------------------------------------

  const listJSX = list.map((item: ITreeOption, i: number) => {
    item.parent = parent;
    return (
      <TreeItem id={id} key={item.value} item={item} onChange={onChange} depth={depth + 1} open={open} activeItem={activeItem} last={i === list.length - 1}/>
    );
  });

  // ---------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className='rf-tree' style={style}>
      {listJSX}
    </div>
  );
};

export default Folder;
