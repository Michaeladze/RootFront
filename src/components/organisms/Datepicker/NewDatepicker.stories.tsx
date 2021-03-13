import React from 'react';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import NewDatepicker from './NewDatepicker';

export default {
  title: 'Form Controls/NewDatepicker',
  component: NewDatepicker
};

export const newDatepicker = () => {

  return (
    <Story name='Datepicker' width={600}>
      <StoryItem description='Выбор даты'>
        <div style={{ width: '200px' }}>
          <NewDatepicker />
        </div>
      </StoryItem>
    </Story>
  );
};
