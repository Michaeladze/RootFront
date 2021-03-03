import React, {
  ReactNode, useEffect, useRef
} from 'react';
import { Link } from 'react-router-dom';
import Chevron from '../../../_icons/chevron-left-outline';
import { Tabs, UserPhoto } from '../../../../index';
import { IUser } from '../../../../types/projects.types';
import { ITab } from '../../../../types';


export interface IPageProps {
  title?: ReactNode;
  className?: string;
  backUrl?: string;
  children?: ReactNode | ReactNode[];
  user?: IUser;
  /** Navigation */
  navigation?: ITab[];
  /** Fixed action menu */
  actionMenu?: ReactNode;
}

const Page: React.FC<IPageProps> = ({
  title,
  className = '',
  backUrl = '',
  user,
  children,
  navigation,
  actionMenu
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

            <UserPhoto className='rf-page__user' fullName={user?.fullName} radius={'48px'}/>
          </div>
          {navigation && (
            <div className='rf-page__tabs'>
              <Tabs list={navigation}/>
            </div>
          )}
          {actionMenu && (
            <div className='rf-page__action-menu'>
              {actionMenu}
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
