import React, {
  ReactNode, useEffect, useRef
} from 'react';
import { Link } from 'react-router-dom';
import Chevron from '../../../_icons/chevron-left-outline';
import { Preloader, Tabs } from '../../../../index';
import { IUser } from '../../../../types/projects.types';
import { IListElement, ITab } from '../../../../types';
import User from '../../molecules/User';
import './Page.scss';

export interface IPageProps {
  title?: ReactNode;
  className?: string;
  backUrl?: string;
  onBackUrlClick?: () => void;
  children?: ReactNode | ReactNode[];
  user?: IUser;
  /** Список действий в дропдауне пользователя */
  actionsList?: IListElement[];
  /** Положение меню пользователя слева или справа */
  menuPosition?: 'left' | 'right';
  /** Navigation */
  navigation?: ITab[];
  preloader?: boolean;
}

const Page: React.FC<IPageProps> = ({
  title,
  className = '',
  backUrl = '',
  onBackUrlClick,
  user,
  actionsList = [],
  menuPosition = 'right',
  children,
  navigation,
  preloader = false
}: IPageProps) => {

  // -------------------------------------------------------------------------------------------------------------------

  /** Ссылка на страницу */
  const pageRef = useRef<HTMLDivElement>(null);
  /** Ссылка на шапку */
  const headerRef = useRef<HTMLDivElement>(null);
  /** Ссылка на контент */
  const contentRef = useRef<HTMLDivElement>(null);

  /** Расчет отступа сверху для контента */
  useEffect(() => {
    setTimeout(() => {
      if (headerRef.current && contentRef.current) {
        contentRef.current.style.paddingTop = `${headerRef.current.offsetHeight}px`;
      }
    });
  }, []);

  // -------------------------------------------------------------------------------------------------------------------

  const onBackClick = (e: React.MouseEvent) => {
    if (onBackUrlClick) {
      e.preventDefault();
      onBackUrlClick();
    }
  };

  return (
    <div className={`rf-page ${className}`} ref={pageRef}>
      <header className='rf-page__header' ref={headerRef}>
        <div className='rf-page__header-inner'>
          <div className='rf-page__header-wrapper'>
            {backUrl && <Link to={backUrl} onClick={onBackClick} className='rf-page__header-back'>
              <Chevron/>
            </Link>}
            <h2 className='rf-page__title'>{title}</h2>

            <div className='rf-page__user'>
              <User user={user} menuPosition={menuPosition} actionsList={actionsList} showName={false} radius='48px'/>
            </div>
          </div>
          {navigation && (
            <div className='rf-page__tabs'>
              <Tabs list={navigation}/>
            </div>
          )}
        </div>
      </header>
      <div className='rf-page__content' ref={contentRef}>
        {preloader ? <Preloader/> : children}
      </div>
    </div>
  );
};

export default Page;
