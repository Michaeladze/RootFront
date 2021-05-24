import React, { useState } from 'react';
import FindUsers from './FindUsers';
import Story from '../../../storybook/Story';
import StoryItem from '../../../storybook/StoryItem';
import { Button, Modal } from '../../../../index';
import { IUser } from '../../../../types/projects.types';
import { usersMocks } from './users.mocks';

export default {
  title: 'Projects/FindUsers',
  component: FindUsers
};

export const findUsers = () => {

  const subtitle = 'Поиск только по сотрудникам банка, которым вы можете делегировать свои полномочия (роль “Делегирование”).';

  const [selected, setSelected] = useState<IUser[]>(usersMocks);
  const [show, toggle] = useState(false);

  const getUsers = (users: IUser[]) => {
    setSelected(users);
  };

  return (
    <Story name='Поиск пользователей'>
      <StoryItem description='Модальное окно'>
        <Button onClick={() => toggle(true)}>Найти сотрудника</Button>
        {show && (
          <Modal onClose={() => toggle(false)}>
            <FindUsers
              getUsers={getUsers}
              users={selected}
              disableSelected
              onClose={() => toggle(false)}
              subtitle={subtitle}/>
          </Modal>
        )}
      </StoryItem>
    </Story>
  );
};
