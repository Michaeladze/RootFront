import { FC } from 'react';
import { IUser } from './index';
export interface IProps {
    onClose?: () => void;
    /** Список найденных пользователей*/
    searchData?: IUser[];
    /** Список уже выбранных пользователей */
    users?: IUser[];
    /** Функция поиска пользователей */
    onSearch?: (search: string, department: string) => void;
    /** Очистка */
    onClear?: () => void;
    /** Вернуть выбранных пользователей в компонент */
    getUsers?: (data: IUser[]) => void;
    /** Дополнительная информация о депортаменте поиска */
    department?: string;
    /** Флаг загрузки */
    loaded: boolean;
}
declare const FindUsers: FC<IProps>;
export default FindUsers;
