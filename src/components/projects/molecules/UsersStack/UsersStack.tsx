import React, { FC } from 'react';
import { IUser } from '../../../../types/projects.types';
import { UserPhoto } from '../../../../index';

export interface IUsersStackProps {
  usersMocks: IUser[];
  /** Радиус */
  radius?: string;
}

const UsersStack: FC<IUsersStackProps> = ({ users, radius }: IUsersStackProps) => {
  const LIMIT = 3;
  const slicedUsers = users.filter((_: IUser, i: number) => i < LIMIT);

  const usersJSX = slicedUsers.map((u: IUser, i: number) => (
    <div
      className='users-stack__item'
      key={u.id}
      style={{
        transform: `translateX(-${16 * i}px)`,
        zIndex: users.length - i
      }}>
      <UserPhoto url={u.photo} fullName={u.fullName} radius={radius} />
    </div>
  ));

  return (
    <div className='users-stack'>
      {usersJSX}
      {LIMIT < users.length && <span className='users-stack__value'>+{users.length - LIMIT}</span>}
    </div>
  );
};

export default UsersStack;
