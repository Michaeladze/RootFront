import React, { useEffect, useState } from 'react';
import Timepicker from './Timepicker';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Form Controls/Timepicker',
  component: Timepicker
};

export const timepicker = () => {
  const [s, setS] = useState('14:00');

  useEffect(() => {
    setTimeout(() => {
      setS('16:00');
    }, 1000);
  }, []);

  return (
    <Story name='Timepicker' height={600}>
      <StoryItem description='Выбор времени'>
        <Timepicker name='timepicker' initialValue={s} min='12:30' max='20:15' />
      </StoryItem>
    </Story>
  );
};
