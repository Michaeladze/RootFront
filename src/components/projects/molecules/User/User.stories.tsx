import React from 'react';
import User from './User';
import { IListElement } from '../../../../types';
import Story from '../../../storybook/Story';

export default {
  title: 'Projects/User',
  component: User
};

export const user = () => {
  const actionsList: IListElement[] = [
    { label: 'Настройки' },
    { label: 'Помощь' },
    {
      separated: true,
      label: 'Выйти',
      handler: () => {
        console.log('Выйти');
      }
    }
  ];

  const user = {
    firstName: 'Человек',
    lastName: 'Павук',
    photo: ''
  };

  return (
    <Story name='Пользователь' description='Иконка с именем и списком действий' height={400}>
      <User actionsList={actionsList} user={user} />
    </Story>
  );
};
