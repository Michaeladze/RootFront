import React, { useEffect, useState } from 'react';
import './FolderItem.scss';
import { IOption } from '../../../types';
import Folder from './Folder';
import Angle from '../../_icons/angle-down';
import { Checkbox } from '../../../index';

interface IFolderItemProps {
  item: IOption;
  depth: number;
  open: boolean;
}

const FolderItem: React.FC<IFolderItemProps> = ({ item, depth, open }: IFolderItemProps) => {

  const [showFolder, toggleFolder] = useState<boolean>(open);

  useEffect(() => {
    toggleFolder(open);
  }, [open]);

  // -------------------------------------------------------------------------------------------------------------------

  const openClass = showFolder && item.children ? 'rf-folder__item--open' : 'rf-folder__item--close';
  const showFolderClass = showFolder ? '' : 'rf-folder__item-folder--hidden';
  const showFolderIconClass = showFolder ? '' : 'rf-folder__item-label-icon--rotate';
  const itemChildrenClass = item.children ? '' : 'rf-folder__item--no-children';

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className={`rf-folder__item ${openClass} ${itemChildrenClass}`}>
      <div className='rf-folder__item-label' onClick={() => toggleFolder(!showFolder)}>
        <Angle className={`rf-folder__item-label-icon ${showFolderIconClass}`}/>
        <Checkbox label={item.label} value={item.value}/>
      </div>
      {item.children && (
        <div className={`rf-folder__item-folder ${showFolderClass}`}>
          <Folder list={item.children} depth={depth} open={open}/>
        </div>
      )}
    </div>
  );
};

export default FolderItem;
