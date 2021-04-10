import React from 'react';
import { IOption } from '../../../types';
import FolderItem from './FolderItem';


export interface IFolderProps {
  /** Список */
  list: IOption[];
  /** Глубина вложенности */
  depth?: number;
  /** Состояние открыт/закрыт */
  open?: boolean;
}

const Folder: React.FC<IFolderProps> = ({ list, depth = 0, open = false }: IFolderProps) => {

  /** Базовый размер отступа слева */
  const PADDING_LEFT_BASE = 40;
  const style = { paddingLeft: depth === 0 ? 0 : PADDING_LEFT_BASE };

  // -------------------------------------------------------------------------------------------------------------------

  const listJSX = list.map((item: IOption) => <FolderItem key={item.value} item={item} depth={depth + 1} open={open}/>);

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='rf-folder' style={style}>
      {listJSX}
    </div>
  );
};

export default Folder;
