import { FC } from 'react';
import { INotification } from '../../molecules/Notifications/Notifications';
export interface IProps {
    item: INotification;
    remove?: (id: number) => void;
}
declare const Notification: FC<IProps>;
export default Notification;
