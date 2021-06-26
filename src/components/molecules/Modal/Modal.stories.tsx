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

  const modalFooter = (
    <>
      <Button> Согласен </Button>
    </>
  );

  return (
    <Story name='Modal (Модальное окно)'>
      <StoryItem description='Модальное окно открывается поверх страницы.'>
        <Button onClick={() => toggle(true)}>Открыть</Button>
        {show && (
          <Modal onClose={() => toggle(false)} header='Заголовок модального окна' footer={modalFooter}>
            <ModalChild />
          </Modal>
        )}
      </StoryItem>
    </Story>
  );
};
