import React, { FC } from 'react';
import { IListElement } from '../../../../types';
import Button from '../../../atoms/Button';
import UserPhoto from '../../atoms/UserPhoto';
import { Menu } from '../../../../index';

/** Упрощенный интерфейс пользователя */
interface IUser {
  /** Имя пользователя */
  firstName: string;
  /** Фамилия пользователя */
  lastName: string;
  /** Ссылка на фото */
  photo: string;
}

export interface IUserProps {
  /** Список действий в дропдауне */
  actionsList: IListElement[];
  /** Пользователь */
  user: IUser | null;
  /** Показать имя */
  showName?: boolean;
}

const User: FC<IUserProps> = ({ actionsList, user, showName = true }: IUserProps) => {
  return (
    <>
      {user && (
        <Menu list={actionsList}>
          <Button className='app-header__user-button' buttonType='text'>
            <UserPhoto url={user.photo} fullName={`${user.firstName} ${user.lastName}`} />
            { showName && <h4 className='user__name'>{user.firstName}</h4> }
          </Button>
        </Menu>
      )}
    </>
  );
};

export default User;
