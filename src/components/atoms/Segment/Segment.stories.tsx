import React from 'react';
import Segment from './Segment';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';
import { IOption } from '../../../types';

export default {
  title: 'Segment',
  component: Segment
};

export const segment = () => {

  const list: [IOption, IOption] = [
    {
      value: '1',
      label: 'Заявки'
    },
    {
      value: '2',
      label: 'Задачи'
    }
  ];

  return (
    <Story name='Segment (Сегмент 🧐)' description='Текстовый переключатель.'>

      <StoryItem>
        <StoryRow>
          <Segment list={list}/>
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
