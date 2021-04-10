import React from 'react';
import Folder from './Folder';
import StoryItem from '../../storybook/StoryItem';
import Story from '../../storybook/Story';
import { IOption } from '../../../types';

export default {
  title: 'Folder',
  component: Folder
};

export const folder = () => {

  const list: IOption[] = [
    {
      value: '1',
      label: 'Подразделение 1',
      children: [
        {
          value: '1_1',
          label: 'Подразделение 1_1',
          children: [
            {
              value: '1_1_1',
              label: 'Подразделение 1_1_1'
            },
            {
              value: '1_1_2',
              label: 'Подразделение 1_1_2'
            },
            {
              value: '1_1_3',
              label: 'Подразделение 1_1_3',
              children: [
                {
                  value: '1_1_3_1',
                  label: 'Подразделение 1_1_3_1'
                },
                {
                  value: '1_1_3_2',
                  label: 'Подразделение 1_1_3_2'
                }
              ]
            }
          ]
        },
        {
          value: '1_2',
          label: 'Подразделение 1_2',
          children: [
            {
              value: '1_2_1',
              label: 'Подразделение 1_2_1',
            },
            {
              value: '1_2_2',
              label: 'Подразделение 1_2_2',
            }
          ]
        }
      ]
    },
    {
      value: '2',
      label: 'Подразделение 2',
      children: [
        {
          value: '2_1',
          label: 'Подразделение 2_1'
        },
        {
          value: '2_2',
          label: 'Подразделение 2_2'
        }
      ]
    }
  ];

  return (
    <Story name='Folder' width={600}>
      <StoryItem description='Древовидная структура с бесконечной вложенностью'>
        <Folder list={list}/>
      </StoryItem>
    </Story>
  );
};
