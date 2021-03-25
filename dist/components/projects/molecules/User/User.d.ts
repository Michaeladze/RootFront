import { FC } from 'react';
import { IListElement } from '../../../../types';
/** Упрощенный интерфейс пользователя */
interface IUser {
    fullName?: string;
    /** Имя пользователя */
    firstName?: string;
    /** Фамилия пользователя */
    lastName?: string;
    /** Ссылка на фото */
    photo?: string;
}
export interface IUserProps {
    /** Пользователь */
    user: IUser | undefined | null;
    /** Показать имя */
    showName?: boolean;
    radius?: string;
    /** Список действий в дропдауне */
    actionsList?: IListElement[];
    /** Положение слева или справа */
    menuPosition?: 'left' | 'right';
}
declare const User: FC<IUserProps>;
export default User;
