import React, { useEffect } from 'react';
import Notifications from './Notifications';
import { requestWithRetry } from '../../../utils/requestWithRetry';
import Axios from 'axios-observable';
import { Observable } from 'redux';
import Story from '../../storybook/Story';

export default {
  title: 'Notifications/Retry Request',
  component: Notifications
};

export const retryRequest = () => {
  const service = (url: string): Observable<any> => {
    return requestWithRetry(Axios.get(url), service.bind(null, 'https://jsonplaceholder.typicode.com/error')).subscribe((o: any) => {
      console.log(o);
    });
  };

  useEffect(() => {
    service('https://jsonplaceholder.typicode.com/error');
  }, []);

  return (
    <Story
      name='Повторное подключение'
      description='При инициализации выполняется запрос на ошибочный адрес. Происходит попытка повторного подключения. Кнопка
        Повторить сейчас сбрасывает таймер и становится неактивной на 5 секунд. Крестик останавливает
        попытки подключения и закрывает подсказку.'>
      <Notifications />
    </Story>
  );
};
