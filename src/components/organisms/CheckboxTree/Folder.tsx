import React from 'react';
import { ITreeOption } from '../../../types';
import FolderItem from './FolderItem';

export interface IFolderProps {
  /** Список */
  list: ITreeOption[];
  /** Глубина вложенности */
  depth?: number;
  /** Состояние открыт/закрыт */
  open?: boolean;
  /** Родительский элемент */
  parent?: ITreeOption;
  /** Обновление структуры */
  onChange: (f: boolean, o: ITreeOption) => void;
}

const Folder: React.FC<IFolderProps> = ({ list, onChange, parent, depth = 0, open = false }: IFolderProps) => {

  // ---------------------------------------------------------------------------------------------------------------------------------------

  /** Базовый размер отступа слева */
  const PADDING_LEFT_BASE = 40;
  const style = { paddingLeft: depth === 0 ? 0 : PADDING_LEFT_BASE };

  // ---------------------------------------------------------------------------------------------------------------------------------------

  const listJSX = list.map((item: ITreeOption) => {
    item.parent = parent;
    return (
      <FolderItem key={item.value} item={item} onChange={onChange} depth={depth + 1} open={open}/>
    );
  });

  // ---------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className='rf-folder' style={style}>
      {listJSX}
    </div>
  );
};

export default Folder;
