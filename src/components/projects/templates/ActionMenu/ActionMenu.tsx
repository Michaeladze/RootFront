import React, { ReactNode } from 'react';
import { IOption } from '../../../../types';
import {
  Button, Input, Menu, Select
} from '../../../../index';
import { IActionMenuListConfig } from '../../../../types/projects.types';
import AngleDown from '../../../_icons/angle-down';
import './ActionMenu.scss';
interface IActionMenuProps {
  type?: 'default' | 'list' | 'action';
  listConfig?: IActionMenuListConfig;
  children?: ReactNode | ReactNode[];
}

const ActionMenu: React.FC<IActionMenuProps> = ({
  type = 'default',
  listConfig,
  children
}: IActionMenuProps) => {


  // -------------------------------------------------------------------------------------------------------------------

  const getSortValue = (o: IOption) => {
    listConfig?.onSort(o.value);
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    listConfig?.onSearch((e.target as HTMLInputElement).value);
  };

  const listJSX = listConfig && (
    <div className='rf-action-menu__header'>
      <div className='rf-action-menu__sorting'>
        {listConfig.sortList.length > 0 && listConfig &&
        <Select readOnly options={listConfig.sortList} value={listConfig.defaultSortValue || listConfig.sortList[0].value} getValue={getSortValue}/>}
      </div>
      <div className='rf-action-menu__search'>
        <Input onKeyUp={handleSearch} placeholder='Поиск' search onClear={listConfig.onClear}/>
      </div>
      {
        listConfig.singleAction && (
          <div className='rf-action-menu__list-button'>
            <Button onClick={listConfig.singleAction}>
              {listConfig.actionLabel || 'Создать'}
            </Button>
          </div>
        )
      }
      {!listConfig.singleAction && listConfig.actionList.length > 0 && (
        <div className='rf-action-menu__list-button'>
          <Menu list={listConfig.actionList} position='right'>
            <Button>
              {listConfig.actionLabel || 'Создать'}<AngleDown className='rf-action-menu__list-button-icon'/>
            </Button>
          </Menu>
        </div>
      )}
    </div>
  );

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className={`rf-action-menu rf-action-menu--${type}`}>
      {type === 'list' ? listJSX : children}
    </div>
  );
};

export default ActionMenu;
