import React, { FC, ReactNode } from 'react';
import './AppHeader.scss';
import { Link } from 'react-router-dom';
import Container from '../../../atoms/Container';
import { IListElement } from '../../../../types';
import User from '../../molecules/User';
import Logo from '../../../_icons/vtb-logo';
import { IUser } from '../../../../types/projects.types';
import { Preloader } from '../../../../index';

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

const AppHeader: FC<IAppHeaderProps> = ({
  homeUrl = '/',
  appName,
  children,
  user = null,
  actionsList = [],
  showShadow = true,
  className = ''
}: IAppHeaderProps) => {
  return (
    <header className={`app__header ${showShadow ? 'app__header--shadow' : ''} ${className}`}>
      <Container>
        <div className='app__header-content'>
          <Link to={homeUrl} className='app-header__logo'>
            <Logo className='app-header__logo-icon' />
            <span className='app-header__logo-name'>{appName}</span>
          </Link>

          <div className='app__header-content-wrapper'>{children && children}</div>

          <div className='header-menu__user'>
            {user ? <User actionsList={actionsList} user={user} /> : <Preloader />}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default AppHeader;
