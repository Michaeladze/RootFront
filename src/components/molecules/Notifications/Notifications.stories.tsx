import React, { useEffect } from 'react';
import Notifications, { sendNotification } from './Notifications';
import Story from '../../storybook/Story';

export default {
  title: 'Notifications/Menu',
  component: Notifications
};

export const notificationsList = () => {
  useEffect(() => {
    sendNotification({ message: 'Данные сохранены.' });

    setTimeout(() => {
      sendNotification({
        message: 'Произошла ошибка. Обратитесь к разработчикам.',
        variant: 'danger'
      });
    }, 2000);

    setTimeout(() => {
      sendNotification({
        message: 'Данные не смогут быть восстановлены.',
        variant: 'warning'
      });
    }, 4000);

    setTimeout(() => {
      sendNotification({ message: 'Данные удалены.' });
    }, 6000);
  }, []);

  return (
    <Story name='Notification (Уведомления)' description='Уведомления для пользователей'>
      <Notifications />
    </Story>
  );
};
