import React, {
  ReactNode, useEffect, useRef
} from 'react';
import { Link } from 'react-router-dom';
import Chevron from '../../../_icons/chevron-left-outline';
import { Tabs } from '../../../../index';
import { IUser } from '../../../../types/projects.types';
import { IListElement, ITab } from '../../../../types';
import User from '../../molecules/User';


export interface IPageProps {
  title?: ReactNode;
  className?: string;
  backUrl?: string;
  children?: ReactNode | ReactNode[];
  user?: IUser;
  /** Список действий в дропдауне пользователя */
  actionsList?: IListElement[];
  /** Положение меню пользователя слева или справа */
  menuPosition?: 'left' | 'right';
  /** Navigation */
  navigation?: ITab[];
}

const Page: React.FC<IPageProps> = ({
  title,
  className = '',
  backUrl = '',
  user,
  actionsList = [],
  menuPosition = 'right',
  children,
  navigation
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
    if (headerRef.current && contentRef.current) {
      contentRef.current.style.marginTop = `${headerRef.current.offsetHeight}px`;
    }
  }, []);

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className={`rf-page ${className}`} ref={pageRef}>
      <header className='rf-page__header' ref={headerRef}>
        <div className='rf-page__header-inner'>
          <div className='rf-page__header-wrapper'>
            {backUrl && <Link to={backUrl} className='rf-page__header-back'>
              <Chevron/>
            </Link>}
            <h2 className='rf-page__title'>{title}</h2>

            <div className='rf-page__user'>
              <User user={user} menuPosition={menuPosition} actionsList={actionsList} radius='48px'/>
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
        {children}
      </div>
    </div>
  );
};

export default Page;
