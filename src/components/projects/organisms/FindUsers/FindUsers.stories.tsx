import React, { useState } from 'react';
import FindUsers from './FindUsers';
import Story from '../../../storybook/Story';
import StoryItem from '../../../storybook/StoryItem';
import { Button, Modal } from '../../../../index';
import { users } from './users';
import { IUser } from '../../../../types/projects.types';

export default {
  title: 'Projects/FindUsers',
  component: FindUsers
};

export const findUsers = () => {

  const subtitle = 'Поиск только по сотрудникам банка, которым вы можете делегировать свои полномочия (роль “Делегирование”).';

  const [filtered, setFiltered] = useState<IUser[]>(users);

  const onClear = () => {
    setFiltered(users);
  };

  const onSearch = (s: string) => {
    const tmp = users.filter((u: IUser) => u.fullName.toLowerCase().includes(s.toLowerCase()));
    setFiltered(tmp);
  };

  const [show, toggle] = useState(false);

  const getUsers = (users: IUser[]) => {
    console.log(users);
  };

  return (
    <Story name='Поиск пользователей'>
      <StoryItem description='Модальное окно'>
        <Button onClick={() => toggle(true)}>Найти сотрудника</Button>
        {show && (
          <Modal onClose={() => toggle(false)}>
            <FindUsers
              onClear={onClear}
              onSearch={onSearch}
              getUsers={getUsers}
              searchData={filtered}
              loaded={true}
              onClose={() => toggle(false)}
              subtitle={subtitle}/>
          </Modal>
        )}
      </StoryItem>
    </Story>
  );
};
