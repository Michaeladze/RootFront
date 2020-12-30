import React from 'react';
import Message from './Message';
import { Variant } from '../../../types';
import { variants } from '../../../utils/helpers';
import StoryRow from '../../storybook/StoryRow';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Message',
  component: Message
};

export const message = () => {
  const messagesJSX = variants.map((variant: Variant) => (
    <StoryRow key={variant}>
      <Message variant={variant}>Это очень красивое тестовое сообщение</Message>
    </StoryRow>
  ));

  return (
    <Story name='Message (Уведомление)'>
      <StoryItem description='Уведомление для пользователя при выполнении какого-нибудь действия, на которое пользователь хотел бы получить реакцию приложения. '>
        {messagesJSX}
      </StoryItem>
    </Story>
  );
};
