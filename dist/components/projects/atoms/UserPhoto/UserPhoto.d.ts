import { FC } from 'react';
import './UserPhoto.scss';
export interface IUserPhotoProps {
    className?: string;
    /** Ссылка на фото */
    url?: string;
    /** Фамилия и Имя */
    fullName?: string;
    /** Радиус */
    radius?: string;
}
declare const UserPhoto: FC<IUserPhotoProps>;
export default UserPhoto;
