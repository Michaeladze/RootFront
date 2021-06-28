import React from 'react';
import { ITreeOption } from '../../../types';
import Tree from './Tree';

interface IOrgTreeProps {
  /** Уникальный ID */
  id?: string;
  /** Список */
  list: ITreeOption[];
  /** Состояние открыт/закрыт */
  open?: boolean;
  /** Изменение состояние */
  onChange?: (option: ITreeOption) => void;
  /** Активная опция в случае единичного выбора */
  activeOption?: ITreeOption;
}

const OrgTree: React.FC<IOrgTreeProps> = ({ id = 'rf-org-tree', list, open, onChange, activeOption }: IOrgTreeProps) => {

  return (
    <div id={id}>
      <Tree id={id} list={list} onChange={onChange} open={open} activeItem={activeOption}/>
    </div>
  );
};

export default OrgTree;
