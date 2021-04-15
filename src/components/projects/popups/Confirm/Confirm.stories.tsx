import React from 'react';
import Confirm from './Confirm';
import Story from '../../../storybook/Story';
import { Modal } from '../../../../index';

export default {
  title: 'Projects/Confirm',
  component: Confirm
};

export const confirm = () => {

  const onAction = (comment?: string) => {
    console.log(comment);
  };

  return (
    <Story name='Изображение пользователя'>
      <Modal>
        <Confirm textAccept='Согласен' text='Вы согласны на обработку персональных данных?' onClose={() => {}} onAction={onAction} comment='Комментарий' showComment />
      </Modal>
    </Story>
  );
};
