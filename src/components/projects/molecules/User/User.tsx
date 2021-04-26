import React, { FC } from 'react';
import './User.scss';
import { IListElement } from '../../../../types';
import Button from '../../../atoms/Button';
import UserPhoto from '../../atoms/UserPhoto';
import { Menu } from '../../../../index';

/** Упрощенный интерфейс пользователя */
interface IUser {
  fullName?: string;
  /** Имя пользователя */
  firstName?: string;
  /** Фамилия пользователя */
  lastName?: string;
  /** Ссылка на фото */
  photo?: string;
}

export interface IUserProps {
  /** Пользователь */
  user: IUser | undefined | null;
  /** Показать имя */
  showName?: boolean;
  radius?: string;
  /** Список действий в дропдауне */
  actionsList?: IListElement[];
  /** Положение слева или справа */
  menuPosition?: 'left' | 'right';
}

const User: FC<IUserProps> = ({ actionsList = [], menuPosition = 'right', user, showName = true, radius }: IUserProps) => {

  const name: string = user?.fullName || `${user?.firstName} ${user?.lastName}`;

  return (
    <>
      {user && (
        <Menu list={actionsList} position={menuPosition}>
          <Button className='app-header__user-button' buttonType='text'>
            <UserPhoto url={user.photo} fullName={name} radius={radius} />
            { showName && <h4 className='user__name'>{user.firstName}</h4> }
          </Button>
        </Menu>
      )}
    </>
  );
};

export default User;
