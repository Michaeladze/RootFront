import React, { useEffect, useState } from 'react';
import { ITreeOption } from '../../../types';
import './FolderItem.scss';
import Folder from './Folder';
import Angle from '../../_icons/angle-down';
import { Checkbox, Radio } from '../../../index';

interface IFolderItemProps {
  item: ITreeOption;
  depth: number;
  open: boolean;
  parent?: ITreeOption;
  onChange: (f: boolean, o: ITreeOption) => void;
  multiple: boolean;
  activeItem: ITreeOption | undefined;
}

const FolderItem: React.FC<IFolderItemProps> = ({
  item,
  onChange,
  depth,
  open,
  multiple,
  activeItem
}: IFolderItemProps) => {

  const [showFolder, toggleFolder] = useState<boolean>(open);

  useEffect(() => {
    toggleFolder(open);
  }, [open]);

  // ---------------------------------------------------------------------------------------------------------------------------------------

  const openClass = showFolder && item.children ? 'rf-folder__item--open' : 'rf-folder__item--close';
  const showFolderClass = showFolder ? '' : 'rf-folder__item-folder--hidden';
  const rotateIconClass = showFolder ? '' : 'rf-folder__item-label-icon--rotate';
  const showIconClass = item.children && item.children.length > 0 ? '' : 'rf-folder__item-label-icon--hidden';
  const itemChildrenClass = item.children ? '' : 'rf-folder__item--no-children';
  const activeClass = activeItem?.value === item.value && !multiple ? 'rf-folder__item--active' : '';

  // ---------------------------------------------------------------------------------------------------------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (multiple) {
      item.checked = e.target.checked;
      item.hasCheckedChild = false;
    }

    onChange(e.target.checked, item);
  };

  // ---------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className={`rf-folder__item ${openClass} ${itemChildrenClass} ${activeClass}`}>
      <div className='rf-folder__item-label' onClick={() => toggleFolder(!showFolder)}>
        <Angle className={`rf-folder__item-label-icon ${rotateIconClass} ${showIconClass}`}/>
        {
          multiple ? (
            <Checkbox
              label={item.label}
              value={item.value}
              disabled={item.disabled}
              icon={!item.disabled}
              checked={item.checked}
              halfChecked={item.hasCheckedChild}
              onChange={handleChange}/>
          ) : (
            <Radio
              name='select-tree_unique-name'
              label={item.label}
              value={item.value}
              disabled={item.disabled}
              icon={!item.disabled}
              checked={activeItem?.value === item.value || item.checked}
              onChange={handleChange}/>
          )
        }
      </div>
      {item.children && item.children.length > 0 && (
        <div className={`rf-folder__item-folder ${showFolderClass}`}>
          <Folder list={item.children} onChange={onChange} parent={item} depth={depth} open={open} multiple={multiple} activeItem={activeItem}/>
        </div>
      )}
    </div>
  );
};

export default FolderItem;
