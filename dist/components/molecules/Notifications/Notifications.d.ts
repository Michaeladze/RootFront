/// <reference types="react" />
import './Notifications.scss';
import { Variant } from '../../../types';
/** Удалить уведомление */
export declare const removeNotification: (id?: number | undefined) => void;
/** Добавить уведомление */
export declare const sendNotification: (message: INotification, delay?: number) => void;
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
declare const Notifications: () => JSX.Element;
export default Notifications;
