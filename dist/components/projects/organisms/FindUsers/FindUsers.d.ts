import { FC, ReactNode } from 'react';
import './FindUsers.scss';
import { IUser } from '../../../../types/projects.types';
export interface IProps {
    onClose?: () => void;
    /** Список уже выбранных пользователей */
    users?: IUser[];
    /** Вернуть выбранных пользователей в компонент */
    getUsers?: (data: IUser[]) => void;
    /** Подзаголовок */
    subtitle?: ReactNode;
    /** Деактивировать выбранных пользователей */
    disableSelected?: boolean;
    /** Множественный выбор */
    multiSelect?: boolean;
}
declare const FindUsers: FC<IProps>;
export default FindUsers;
