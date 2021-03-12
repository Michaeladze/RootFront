import React, { ReactNode } from 'react';
import { IOption } from '../../../../types';
import {
  Button, Input, Menu, Select
} from '../../../../index';
import { IActionMenuListConfig } from '../../../../types/projects.types';
import AngleDown from '../../../_icons/angle-down';

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
        <Select readOnly options={listConfig.sortList} value={listConfig.sortList[0].value} getValue={getSortValue}/>
      </div>
      <div className='rf-action-menu__search'>
        <Input onKeyUp={handleSearch} placeholder='Поиск' search onClear={listConfig.onClear}/>
      </div>
      {listConfig.actionList.length > 0 && (
        <div className='rf-action-menu__list-button'>
          {
            listConfig.actionList.length === 1 ? (
              <Button onClick={listConfig.actionList[0].handler}>
                {listConfig.actionList[0].label}
              </Button>
            ) : (
              <Menu list={listConfig.actionList} position='right'>
                <Button>
                  {listConfig.actionLabel || 'Создать'}<AngleDown className='rf-action-menu__list-button-icon'/>
                </Button>
              </Menu>
            )
          }
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
