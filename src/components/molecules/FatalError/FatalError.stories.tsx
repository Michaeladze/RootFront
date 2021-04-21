import React from 'react';
import FatalError from './FatalError';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'FatalError',
  component: FatalError
};


export const fatalError = () => {

  return (
    <Story name='FatalError' description='Ошибка' width={600}>
      <StoryItem>
        <FatalError/>
      </StoryItem>
    </Story>
  );
};
