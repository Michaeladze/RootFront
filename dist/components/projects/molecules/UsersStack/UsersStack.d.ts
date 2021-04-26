import { FC } from 'react';
import { IUser } from '../../../../types/projects.types';
import './UsersStack.scss';
export interface IUsersStackProps {
    users: IUser[];
    /** Радиус */
    radius?: string;
}
declare const UsersStack: FC<IUsersStackProps>;
export default UsersStack;
