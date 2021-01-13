import React, { useState } from 'react';
import BackdropLoader from './BackdropLoader';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import Button from '../Button';

export default {
  title: 'BackdropLoader',
  component: BackdropLoader
};

export const backdropLoader = () => {
  const [show, toggle] = useState(false);

  const onClick = () => {
    toggle(true);
  };

  return (
    <Story name='BackdropLoader (Загрузка с блокированием страницы)'>
      <StoryItem
        description='Когда нужно загрузить данные и не дать пользователю совершить действия на странице.'>
        <Button onClick={onClick}> Push me </Button>
        {show && <BackdropLoader/>}
      </StoryItem>
    </Story>
  );
};
