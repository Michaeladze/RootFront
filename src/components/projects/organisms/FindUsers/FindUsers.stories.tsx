import React from 'react';
import FindUsers from './FindUsers';
import Story from '../../../storybook/Story';
import StoryItem from '../../../storybook/StoryItem';
import { IUser } from './index';

export default {
  title: 'Projects/FindUsers',
  component: FindUsers
};

export const findUsers = () => {

  const users: IUser[] = [
    {
      id: '1',
      firstName: 'Michael',
      lastName: 'Kutateladze',
      middleName: '',
      fullName: 'Michael Kutateladze',
      positionName: 'Engineer',
      positionId: 'FE 1',
      department: 'Department',
      departmentId: '11',
      structDepartmentId: '12',
      structDepartmentName: 'Test',
      photo: 'Test'
    }
  ];

  return (
    <Story name='Поиск пользователей'>
      <StoryItem description='Модальное окно'>
        <FindUsers users={users} searchData={users} loaded={true} />
      </StoryItem>
    </Story>
  );
};
