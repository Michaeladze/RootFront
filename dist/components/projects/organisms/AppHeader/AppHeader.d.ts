import { FC, ReactNode } from 'react';
import './AppHeader.scss';
import { IListElement } from '../../../../types';
import { IUser } from '../../../../types/projects.types';
export interface IAppHeaderProps {
    /** Название приложения */
    appName: string;
    /** Пользователь */
    user?: IUser | null;
    /** Список действий в дропдауне пользователя */
    actionsList?: IListElement[];
    /** Содержимое между лого и пользователем */
    children?: ReactNode;
    /** Включить тень */
    showShadow?: boolean;
    /** Адрес домашней страницы */
    homeUrl?: string;
    /** Дополнительный класс */
    className?: string;
}
declare const AppHeader: FC<IAppHeaderProps>;
export default AppHeader;
