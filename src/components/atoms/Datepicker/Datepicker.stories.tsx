import React from 'react';
import Datepicker from './Datepicker';
import { FormGroup } from '../../../index';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Form Controls/Datepicker',
  component: Datepicker
};

export const datepicker = () => {
  const onChange = (d: Date | null, name?: string) => {
    console.log(name, d);
  };

  return (
    <Story name='Datepicker (Выбор даты))' width={500}>
      <StoryItem description='Тип inline'>
        <FormGroup label='Inline'>
          <Datepicker name='dateTo' value={new Date()} onChange={onChange} />
        </FormGroup>
      </StoryItem>
      <StoryItem description='Тип outline'>
        <FormGroup label='Outline'>
          <Datepicker name='dateFrom' value={new Date()} onChange={onChange} inputType='outline' />
        </FormGroup>
      </StoryItem>
    </Story>
  );
};
