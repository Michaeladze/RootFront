import React, { ReactNode } from 'react';
import './Page.scss';
import { Link } from 'react-router-dom';
import Chevron from '../../../_icons/chevron-left-outline';
import { UserPhoto } from '../../../../index';
import { IUser } from '../../../../types/projects.types';


export interface IPageProps {
  title?: ReactNode;
  className?: string;
  backUrl?: string;
  children?: ReactNode | ReactNode[];
  user?: IUser;
}

const Page: React.FC<IPageProps> = ({
  title,
  className = '',
  backUrl = '',
  user,
  children
}: IPageProps) => {


  // -------------------------------------------------------------------------------------------------------------------


  return (
    <div className={`rf-page ${className}`}>
      <header className='rf-page__header'>
        {backUrl && <Link to={backUrl} className='rf-page__header-back'>
          <Chevron/>
        </Link>}
        <h2 className='rf-page__title'>{title}</h2>

        <UserPhoto className='rf-page__user' fullName={user?.fullName} radius={'48px'}/>
      </header>
      {children}
    </div>
  );
};

export default Page;
