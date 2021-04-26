import { FC } from 'react';
import { INotification } from '../../molecules/Notifications/Notifications';
import './Notification.scss';
export interface IProps {
    item: INotification;
    remove?: (id: number) => void;
}
declare const Notification: FC<IProps>;
export default Notification;
