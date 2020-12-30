import Modal from './Modal';
import React, { useState } from 'react';
import ModalChild from './ModalChild';
import { Button } from '../../../index';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Modal',
  component: Modal
};

export const modal = () => {
  const [show, toggle] = useState(false);

  return (
    <Story name='Modal (Модальное окно)'>
      <StoryItem description='Модальное окно открывается поверх страницы.'>
        <Button onClick={() => toggle(true)}>Открыть</Button>
        {show && (
          <Modal onClose={() => toggle(false)}>
            <ModalChild />
          </Modal>
        )}
      </StoryItem>
    </Story>
  );
};
