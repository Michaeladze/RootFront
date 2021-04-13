import React, { useEffect, useState } from 'react';
import { ITreeOption } from '../../../types';
import Folder from './Folder';
import Angle from '../../_icons/angle-down';
import { Checkbox } from '../../../index';

interface IFolderItemProps {
  item: ITreeOption;
  depth: number;
  open: boolean;
  parent?: ITreeOption;
  onChange: (f: boolean, o: ITreeOption) => void;
}

const FolderItem: React.FC<IFolderItemProps> = ({
  item,
  onChange,
  depth,
  open
}: IFolderItemProps) => {

  const [showFolder, toggleFolder] = useState<boolean>(open);

  useEffect(() => {
    toggleFolder(open);
  }, [open]);

  // ---------------------------------------------------------------------------------------------------------------------------------------

  const openClass = showFolder && item.children ? 'rf-folder__item--open' : 'rf-folder__item--close';
  const showFolderClass = showFolder ? '' : 'rf-folder__item-folder--hidden';
  const showFolderIconClass = showFolder ? '' : 'rf-folder__item-label-icon--rotate';
  const itemChildrenClass = item.children ? '' : 'rf-folder__item--no-children';

  // ---------------------------------------------------------------------------------------------------------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    item.checked = e.target.checked;
    item.hasCheckedChild = false;
    onChange(e.target.checked, item);
  };

  // ---------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className={`rf-folder__item ${openClass} ${itemChildrenClass}`}>
      <div className='rf-folder__item-label' onClick={() => toggleFolder(!showFolder)}>
        <Angle className={`rf-folder__item-label-icon ${showFolderIconClass}`}/>
        <Checkbox
          label={item.label}
          value={item.value}
          disabled={item.disabled}
          checked={item.checked}
          halfChecked={item.hasCheckedChild}
          onChange={handleChange}/>
      </div>
      {item.children && (
        <div className={`rf-folder__item-folder ${showFolderClass}`}>
          <Folder list={item.children} onChange={onChange} parent={item} depth={depth} open={open}/>
        </div>
      )}
    </div>
  );
};

export default FolderItem;
