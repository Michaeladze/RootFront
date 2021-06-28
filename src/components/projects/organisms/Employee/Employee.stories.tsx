import React from 'react';
import Employee from './Employee';
import { usersMocks } from '../FindUsers/users.mocks';
import Story from '../../../storybook/Story';

export default {
  title: 'Projects/Employee',
  component: Employee
};

export const employee = () => {

  return (
    <Story name='Employee'>
      <Employee user={usersMocks[usersMocks.length - 1]}/>
    </Story>
  );
};
