import React from 'react';
import Folder from './Folder';
import StoryItem from '../../storybook/StoryItem';
import Story from '../../storybook/Story';
import { ITreeOption } from '../../../types';
import CheckboxTree from './CheckboxTree';

export default {
  title: 'Folder',
  component: Folder
};

export const folder = () => {

  const list: ITreeOption[] = [
    {
      value: '1',
      label: 'Подразделение 1',
      checked: false,
      children: [
        {
          value: '1_1',
          label: 'Подразделение 1_1',
          checked: false,
          children: [
            {
              value: '1_1_1',
              label: 'Подразделение 1_1_1',
              checked: false,
            },
            {
              value: '1_1_2',
              label: 'Подразделение 1_1_2',
              checked: false,
            },
            {
              value: '1_1_3',
              label: 'Подразделение 1_1_3',
              checked: true,
              children: [
                {
                  value: '1_1_3_1',
                  label: 'Подразделение 1_1_3_1',
                  checked: false,
                },
                {
                  value: '1_1_3_2',
                  label: 'Подразделение 1_1_3_2',
                  checked: false,
                }
              ]
            }
          ]
        },
        {
          value: '1_2',
          label: 'Подразделение 1_2',
          checked: false,
          children: [
            {
              value: '1_2_1',
              label: 'Подразделение 1_2_1',
              checked: false
            },
            {
              value: '1_2_2',
              label: 'Подразделение 1_2_2',
              checked: false
            }
          ]
        }
      ]
    },
    {
      value: '2',
      label: 'Подразделение 2',
      checked: false,
      children: [
        {
          value: '2_1',
          label: 'Подразделение 2_1',
          checked: false,
          disabled: true
        },
        {
          value: '2_2',
          label: 'Подразделение 2_2',
          checked: false,
        }
      ]
    }
  ];

  const onChange = (value: ITreeOption[]) => {
    console.log(value);
  };

  return (
    <Story name='CheckboxTree' width={600}>
      <StoryItem description='Древовидная структура с бесконечной вложенностью'>
        <CheckboxTree list={list} onChange={onChange} open/>
      </StoryItem>
    </Story>
  );
};
