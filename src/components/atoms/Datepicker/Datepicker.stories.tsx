import React from 'react';
import { Datepicker, FormGroup } from '../../../index';
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
      <StoryItem>
        <FormGroup label='Big'>
          <Datepicker name='dateUntil' disabled minDate={new Date()} value={new Date()} onChange={onChange} size='big' />
        </FormGroup>
      </StoryItem>
      <StoryItem>
        <FormGroup label='Medium'>
          <Datepicker name='dateTo' value={new Date()} onChange={onChange} />
        </FormGroup>
      </StoryItem>
      <StoryItem>
        <FormGroup label='Small'>
          <Datepicker name='dateFrom' value={new Date()} onChange={onChange} size='small' />
        </FormGroup>
      </StoryItem>
    </Story>
  );
};
