import React, {
  useEffect, useRef, useState
} from 'react';
import './Notifications.scss';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Variant } from '../../../types';
import Notification from '../../atoms/Notification';

// ---------------------------------------------------------------------------------------------------------------------

/** Стэк уведомлений */
let notifications$$: BehaviorSubject<INotification[]> = new BehaviorSubject<INotification[]>([]);

/** Удалить уведомление */
export const removeNotification = (id?: number) => {
  if (notifications$$.closed || notifications$$.isStopped) {
    return;
  }

  let tmp = [...notifications$$.getValue()];

  if (tmp.length > 0) {
    if (id !== undefined) {
      tmp = tmp.filter((n: INotification) => n.id !== id);
    } else {
      tmp.shift();
    }

    notifications$$.next(tmp);
  }
};

/** Добавить уведомление */
export const sendNotification = (message: INotification, delay = 8000) => {
  if (notifications$$.closed || notifications$$.isStopped) {
    return;
  }

  const tmp = [...notifications$$.getValue()];

  tmp.push({
    ...message,
    id: message.id || Date.now()
  });
  notifications$$.next(tmp);
  setTimeout(() => {
    removeNotification(message.id);
  }, delay);
};

// ----Компонент--------------------------------------------------------------------------------------------------------

export interface INotification {
  /** Текст сообщения */
  message: string;
  /** ID сообщения */
  id?: number;
  /** Тип сообщения */
  variant?: Variant;
  /** Обратный отсчет для уведомлений о повторном подключении*/
  countdown?: number[];
  /** Функция для повторного подключения */
  retryAction?: () => void;
  /** Отменить повторение подключения */
  cancelRetry?: () => void;
}

const Notifications = () => {
  /** Флаг по которому оставновить подписку */
  const obstacle = useRef<Subject<boolean>>(new Subject());

  const [sub, setSub] = useState<BehaviorSubject<INotification[]> | null>(null);

  useEffect(() => {
    if (notifications$$.closed) {
      notifications$$ = new BehaviorSubject<INotification[]>([]);
    }

    setSub(notifications$$);
  }, []);

  /** Список уведомлений */
  const [notifications, setNotifications] = useState<INotification[]>([]);

  // -------------------------------------------------------------------------------------------------------------------

  /** Подписываемся на список уведомлений */
  useEffect(() => {
    if (!sub || sub.closed) {
      return;
    }

    const until = obstacle.current;

    sub.pipe(takeUntil(until)).subscribe((data: INotification[]) => {
      setNotifications(data);
    });

    return () => {
      until.next(true);
    };
  }, [sub]);

  // -------------------------------------------------------------------------------------------------------------------
  /** Список уведомлений TSX */
  const list = notifications.map((n: INotification, i: number) => (
    <Notification key={n.id || i} item={n} remove={removeNotification} />
  ));

  // -------------------------------------------------------------------------------------------------------------------

  return <div className='rf-notifications__list'>{list}</div>;
};

export default Notifications;
