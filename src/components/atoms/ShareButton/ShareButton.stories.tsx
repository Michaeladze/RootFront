import React from 'react';
import ShareButton from './ShareButton';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import { Notifications } from '../../../index';

export default {
  title: 'ShareButton',
  component: ShareButton
};

export const shareButton = () => {
  return (
    <Story name='Кнопка копирования URL'>
      <StoryItem description='Копирует текущий URL из адресной строки'>
        <ShareButton />
      </StoryItem>
      <Notifications />
    </Story>
  );
};
