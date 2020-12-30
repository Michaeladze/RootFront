import React from 'react';
import Notification from './Notification';
import { INotification } from '../../molecules/Notifications/Notifications';
import { variants } from '../../../utils/helpers';
import { Variant } from '../../../types';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Notifications/Item',
  component: Notification
};

export const notificationsItem = () => {
  const messages: INotification[] = variants.map((variant: Variant) => ({
    message: 'Сообщение с уведомлением о том, что данные могли быть сохранены и переданы в управляющий комитет',
    variant
  }));

  const messagesJSX = messages.map((m: INotification) => (
    <StoryRow key={m.variant}>
      <Notification item={m} />
    </StoryRow>
  ));

  return (
    <Story name='Уведомление'>
      <StoryItem description='Сообщение для пользователя'>
        {messagesJSX}
      </StoryItem>
    </Story>
  );
};
