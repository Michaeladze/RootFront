import React, { FC } from 'react';
import './Notification.scss';
import { INotification } from '../../molecules/Notifications/Notifications';
import Close from '../../_icons/close';
import { variantClass } from '../../../utils/helpers';
import RetryCountDown from '../RetryCountDown';

export interface IProps {
  item: INotification;
  remove?: (id: number) => void;
}

const Notification: FC<IProps> = ({ item, remove }) => {
  /** Удалить уведомление */
  const removeNotification = () => {
    item.id && remove && remove(item.id);
    item.cancelRetry && item.cancelRetry();
  };

  return (
    <>
      <div className={`rf-notification ${variantClass[item.variant || 'success']}`}>
        <p className='rf-notification__message'>
          {item.countdown ? <RetryCountDown time={item.countdown} action={item.retryAction} /> : item.message}
        </p>
        <button type='button' className={'rf-notification__close'} onClick={removeNotification}>
          <Close />
        </button>
      </div>
    </>
  );
};

export default Notification;
