import React from 'react';
import UserPhoto from './UserPhoto';
import Story from '../../../storybook/Story';

export default {
  title: 'Projects/UserPhoto',
  component: UserPhoto
};

export const userPhoto = () => {
  return (
    <Story name='Изображение пользователя'>
      <UserPhoto fullName='Кутателадзе Михаил' />
    </Story>
  );
};
