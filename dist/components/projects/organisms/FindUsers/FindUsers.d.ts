import { FC, ReactNode } from 'react';
import { IUser } from '../../../../types/projects.types';
export interface IProps {
    onClose?: () => void;
    /** Список найденных пользователей*/
    searchData?: IUser[];
    /** Список уже выбранных пользователей */
    users?: IUser[];
    /** Функция поиска пользователей */
    onSearch?: (search: string) => void;
    /** Очистка */
    onClear?: () => void;
    /** Вернуть выбранных пользователей в компонент */
    getUsers?: (data: IUser[]) => void;
    /** Дополнительная информация о департаменте поиска */
    department?: string;
    /** Флаг загрузки */
    loaded: boolean;
    /** Подзаголовок */
    subtitle?: ReactNode;
    /** Деактивировать выбранных пользователей */
    disableSelected?: boolean;
}
declare const FindUsers: FC<IProps>;
export default FindUsers;
